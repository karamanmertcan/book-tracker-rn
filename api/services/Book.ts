import axios from 'axios';
import HTTPClient from '../HTTPClient';

export type Book = {
  _id: string;
  bookName: string;
  bookOwner: string;
  bookAuthor: string;
  readPages: Array<any>;
  createdAt: string;
};

export async function getBooks(token: string) {
  const { data } = await HTTPClient.get<Book>('/get-user-books', {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer ' + token
    }
  });
  return data;
}
