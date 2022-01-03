import axios from 'axios';
import HTTPClient from '../HTTPClient';

export type User = {};

export async function login(email: string, password: string) {
  const { data } = await HTTPClient.post<{
    token: string;
    user: object;
    ok: boolean;
  }>('/login', { email: email, password: password });
  return data;
}
