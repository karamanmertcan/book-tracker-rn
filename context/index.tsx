import { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as UserService from '../api/services/User';

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

    UserService.getLastWeekPages(myToken);
  }, []);

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
