import axios from 'axios';
import HTTPClient from '../HTTPClient';

export type User = {
  user: Array<any>[];
};

export async function login(email: string, password: string) {
  const { data } = await HTTPClient.post<{
    token: string;
    user: object;
    ok: boolean;
  }>('/login', { email: email, password: password });
  return data;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await HTTPClient.post<{
    token: string;
    user: object;
  }>('/register', { name: name, email: email, password: password });
  return data;
}

export async function getUserDetails(token: string) {
  const { data } = await HTTPClient.get<any>('/get-user', {
    headers: {
      Accept: 'application/json, text/plain, */*',

      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

export async function getLeaderboardUsers(token: string) {
  const { data } = await HTTPClient.get<User>('/get-rank-users', {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer ' + token
    }
  });
  return data;
}
