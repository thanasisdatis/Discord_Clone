import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import './Login.css';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className='login'>
      <div className='login__logo'>
        <img src='https://cdn.logojoy.com/wp-content/uploads/20210422095037/discord-mascot.png'></img>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
