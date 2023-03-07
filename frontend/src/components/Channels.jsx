import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, SplitButton, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';

import { actions as channelsAction } from '../slices/channelsSlice';
import { actions as modalsActions } from '../slices/modalsSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

  const dispatch = useDispatch();

  const showModal = (type, channelId) => {
   dispatch(modalsActions.openModal({ 
      type,
      extra: { channelId },
   }));
  };
  
  const btnClasses = (id) => cn({ active: currentChannelId === id }, 'd-inline-block', 'text-truncate', 'test');
  const handleClickToSetChannel = (id) => dispatch(channelsAction.setCurrentChannel({ id }));

  return (
     <ul className='nav flex-column'>
        {channels.map(({id, name, removable }) => {
           return (
             <li key={id} className='nav-item w-100'>
               <Dropdown>
                  <Button variant="" className={btnClasses(id)} onClick={() => handleClickToSetChannel(id)}>{`# ${name}`}</Button>
                  {removable ? 
                  <><Dropdown.Toggle split variant="" id="dropdown-split" />
                  <Dropdown.Menu>
                     <Dropdown.Item onClick={() => showModal('removeChannel', id)}>Удалить</Dropdown.Item>
                     <Dropdown.Item onClick={() => showModal('renameChannel', id)}>Переименовать</Dropdown.Item>
                  </Dropdown.Menu></>
                  :
                  null
                  }
               </Dropdown>
             </li>
           );
         })}
     </ul>
   );
};

export default Channels;
