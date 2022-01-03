import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let baseURL = 'http://192.168.1.9:8000/api';

const client = axios.create({
  baseURL
});

export default client;
