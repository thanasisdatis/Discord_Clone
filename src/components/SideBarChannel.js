import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/appSlice';
import './SideBarChannel.css';

function SideBarChannel({ id, channelName }) {
  const dispatch = useDispatch();
  return (
    <div
      className='sideBarChannel'
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        )
      }
    >
      <h4>
        <span className='sidebarChannel__hash'>#</span>
        {channelName}
      </h4>
    </div>
  );
}

export default SideBarChannel;
