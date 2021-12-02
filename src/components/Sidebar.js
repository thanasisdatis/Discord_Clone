import { React, useEffect, useState } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SideBarChannel from './SideBarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoIcon from '@material-ui/icons/Info';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import db, { auth, provider } from '../firebase';

function SideBar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels').onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');

    if (channelName) {
      db.collection('channels').add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h3>The New Discord</h3>
        <ExpandMoreIcon></ExpandMoreIcon>
      </div>
      <div className='sidebar__channels'>
        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon
            onClick={handleAddChannel}
            className='sidebar__addChannel'
          ></AddIcon>
        </div>

        <div className='sidebar__channelsList'>
          {channels.map(({ id, channel }) => (
            <SideBarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className='sidebar__voice'>
        <SignalCellularAltIcon
          className='sidebar__voiceIcon'
          fontSize='large'
        />
        <div className='sidebar__voiceInfo'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className='sidebar__voiceIcons'>
          <InfoIcon />
          <CallIcon />
        </div>
      </div>

      <div className='sidebar__profile'>
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div className='sidebar__profileInfo'>
          <h3>{user.displayName}</h3>
          <p>{user.uid.substring(0, 6)}</p>
        </div>
        <div className='sidebar__profileIcons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
