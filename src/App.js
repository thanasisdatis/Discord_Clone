import React, { useEffect } from 'react';
///import { Counter } from './features/counter/Counter';
import './App.css';
import SideBar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from './firebase';
import { login, selectUser, logout } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser !== null) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoUrl,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className='App'>
      {user ? (
        <>
          {/* SideBar */}
          <SideBar></SideBar>
          {/* Chat */}
          <Chat></Chat>
        </>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}

export default App;
