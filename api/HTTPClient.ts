import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let baseURL = 'http://104.248.133.13/api';

const client = axios.create({
  baseURL
});

export default client;
