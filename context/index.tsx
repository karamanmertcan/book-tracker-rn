import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({
  myToken: ''
});

const UserProvider = ({ children }: { children: any }) => {
  const [myToken, setToken] = useState('');

  const getToken = async () => {
    const bakeToJson: any = await AsyncStorage.getItem('token');
    const token = bakeToJson && JSON.parse(bakeToJson);
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);
  axios.defaults.baseURL = 'http://192.168.1.9:8000/api';

  return (
    <UserContext.Provider
      value={{
        myToken
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
