import axios from 'axios';

export type User = {};

export async function login(email: string, password: string) {
  const { data } = await axios.post<{
    token: string;
    user: object;
  }>('/login', { email: email, password: password });
  return data;
}
