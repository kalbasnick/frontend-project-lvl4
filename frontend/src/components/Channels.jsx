import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsAction } from '../slices/channelsSlice';
import cn from 'classnames';

// import { selectors } from '../slices/channelsSlice';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();
  
  const btnClasses = (channelId) => cn('btn', { active: currentChannelId === channelId });

  const handleClick = (channelId) => {
      dispatch(channelsAction.setCurrentChannel({ channelId }));
  };

  return (
     <ul className='nav flex-column'>
        {channels.map(({id, name}) => {
           return (
             <li key={id} className='nav-item'>
                <button type="button" className={btnClasses(id)} onClick={() => handleClick(id)}>{name}</button> 
             </li>
           );
         })}
     </ul>
   );
};

export default Channels;
