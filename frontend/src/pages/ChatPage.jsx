import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import _ from 'lodash';

import Channels from '../components/Channels';
import Messages from '../components/Messages';

import getModal from '../modals/index.js';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as modalsActions } from '../slices/modalsSlice';

const renderModal = ({ type, extra, hideModal, handleChannelAction, channels }) => {
  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component modalInfo={type} onHide={hideModal} handleChannelAction={handleChannelAction(type, extra)} extra={extra} channels={channels}/>
};

const generateIdForChannels = (data) => data.map((channels) => ({ ...channels, id: Number(_.uniqueId()) }));
const getDefaultChannelId = (channels) => {
  if (!channels) {
    return null;
  }

  return channels[0].id;
};

const ChatPage = ({ socket }) => {
  const { push } = useHistory();
  const userData = JSON.parse(localStorage.getItem('userId'));
  const inputRef = useRef(null);

  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

  const dispatch = useDispatch();

  const handleChannelAction = (type, extra) => (props) => {
    switch (type) {
      case 'addChannel':
        dispatch(channelsActions.setCurrentChannel(props.id));
        dispatch(modalsActions.closeModal());
        dispatch(channelsActions.addChannel(props));
        return;
      case 'removeChannel':
        dispatch(modalsActions.closeModal());
        dispatch(channelsActions.removeChannel(extra));
        socket.emit('removeChannel', { id: extra.channelId });
        return;
      case 'renameChannel':
        dispatch(modalsActions.closeModal());
        dispatch(channelsActions.renameChannel({
          ...extra,
          ...props,
        }));
        return;
      default:
        throw new Error(`${type} is unknown type!`);
    }
  };

  useEffect(() => {
    if (!userData) {
      push('/login');
    }

    inputRef.current.focus();

    socket.on('connect', () => {
      socket.on('newMessage', (payload) => {
        dispatch(messagesActions.addMessage(payload));
      });
    });

    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      });

      const channelsWithGeneratedId = generateIdForChannels(data.channels);
      
      dispatch(channelsActions.setInitialState({
        channels: channelsWithGeneratedId,
        messages: [],
        currentChannelId: getDefaultChannelId(channelsWithGeneratedId),
      }));
    };

    fetchData();
  }, []);

  const f = useFormik({
    initialValues: {
      id: null,
      body: '',
      username: localStorage.username,
      channelId: currentChannelId,
    },
    onSubmit: (values) => {
      socket.emit('newMessage', {
        body: values.body,
        channelId: currentChannelId,
        username: localStorage.username,
      });
      f.handleReset();
    },
  });

  const { type, extra } = useSelector((state) => state.modal);

  const hideModal = () => {
    dispatch(modalsActions.closeModal());
  };

  const showModal = (type) => {
    dispatch(modalsActions.openModal({ 
      type,
      extra: null,
    }));
  };

  
  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <div>
          <span>Каналы</span>
          <button onClick={() => showModal('addChannel')}>+</button>
        </div>
        <div className='col-4 col-md-2 border-end pt-5 px-0 bg-light'>
          <Channels />
        </div>
        {renderModal({ type, extra, hideModal, showModal, handleChannelAction, channels })}
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

export default ChatPage;
