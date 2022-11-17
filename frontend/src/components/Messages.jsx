import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesInfo)
  const { currentChannelId } = useSelector((state) => state.channelsInfo);

  return (
    <>
      {messages.map(({id, username, body, channelId}) => {
        if (currentChannelId === channelId ) {
          return (
            <div key={id} className='text-break mb-2'>
             <b>{username}</b>
             {": "} 
             {body}
            </div>
           );
        }
      })}
    </>
  )
};

export default Messages;
