import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useAtom } from 'jotai';

export const isAuthenticated = atom(true);
export const userState = atom<any>({});
export const myToken = atom<any>('');

export const getTokenAndUserFromStorage = atom(
  () => '',
  async (get, set) => {
    try {
      const token: any = await AsyncStorage.getItem('token');
      const user: any = await AsyncStorage.getItem('user');

      const bakeToJsonUser = user && JSON.parse(user);
      const bakeToJsonToken = token && JSON.parse(token);

      if (bakeToJsonToken && bakeToJsonUser) {
        console.log('user var');

        set(isAuthenticated, true);
        set(userState, {
          user: bakeToJsonUser,
          token: bakeToJsonToken
        });
        set(myToken, bakeToJsonToken);
      } else {
        set(isAuthenticated, false);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserFromStorage = atom(
  () => '',
  async (get, set) => {
    try {
      const user: any = await AsyncStorage.getItem('user');

      const bakeToJsonUser = user && JSON.parse(user);

      if (bakeToJsonUser) {
        set(userState, bakeToJsonUser);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = atom(
  () => '',
  async (get, set) => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      set(isAuthenticated, false);
      set(userState, {});
      set(myToken, '');
    } catch (error) {
      console.log(error);
    }
  }
);
