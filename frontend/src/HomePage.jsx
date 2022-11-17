import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import _ from 'lodash';

import Channels from './components/Channels';
import Messages from './components/Messages';

import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';

const HomePage = () => {
  const { push } = useHistory();
  const userData = JSON.parse(localStorage.getItem('userId'));
  const inputRef = useRef(null);

  useEffect(() => {
    if (!userData) {
      push('/login');
    }

    inputRef.current.focus();

    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      });

      dispatch(channelsActions.setInitialState({
        channels: data.channels,
        messages: [],
        currentChannelId: 1,
      }));
    };

    fetchData();
  }, []);

  const { currentChannelId } = useSelector((state) => state.channelsInfo);

  const dispatch = useDispatch();

  const f = useFormik({
    initialValues: {
      id: null,
      body: '',
      username: localStorage.username,
      channelId: currentChannelId,
    },
    onSubmit: (values) => {
      dispatch(messagesActions.addMessage({
        ...values,
        id: _.uniqueId(),
        channelId: currentChannelId,
      }));
      f.handleReset();
    },
  });
  
  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <div className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
          <Channels />
        </div>
        <div className='col p-0 h-100'>
          <div className='d-flex flex-column h-100'>
            <div id="messages-box" className='chat-messages overflow-auto px-5'>
              <Messages />
            </div>  
            <div className='mt-auto px-5 py-3'>
              <form noValidate className='py-1 border rounded-2' onSubmit={f.handleSubmit}>
                  <div className='input-group has-validation'>
                    <input ref={inputRef} name="body" className="form-control border-0 p-0 ps-2" placeholder="Введите сообщение..." onChange={f.handleChange} value={f.values.body}></input>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
