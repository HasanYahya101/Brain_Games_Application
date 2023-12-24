import * as React from 'react';
import MainContainer from './app/MainContainer';
import HomeStackScreen from './app/MainContainer';
import Auth_App from './app/authentication_screen/Auth_App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [email, setEmail] = React.useState(null);

  AsyncStorage.getItem('email').then((value) => {
    if (value === null) {
      AsyncStorage.setItem('email', 'none');
      setEmail('none');
    } else {
      setEmail(value);
    }
  });

  // if async storage email is none, then show auth app, else show main container
  if (email === 'none') {
    return (
      <Auth_App />
    );
  }
  else {
    return (
      <MainContainer />
    );
  }
}

export default App;