import axios from 'axios';
import HTTPClient from '../HTTPClient';

export type Book = {
  _id: string;
  book: Array<any>[];
  bookName: string;
  bookOwner: string;
  bookAuthor: string;
  readPages?: Array<any>;
  createdAt?: string;
};

export type AddBook = {
  bookName: string;
  bookAuthor: string;
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

export async function addBook(book: { bookName: string; bookAuthor: string }, token: string) {
  const { data } = await HTTPClient.post<AddBook>('/book-add', book, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer ' + token
    }
  });
  return data;
}

export async function getBookDetails(bookId: string, token: string) {
  const { data } = await HTTPClient.get<any>(`/get-single-book/${bookId}`, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer ' + token
    }
  });
  return data;
}

export async function addBookPage(bookId: string, page: number, token: string) {
  const { data } = await HTTPClient.put<any>(
    `/book-add-page`,
    { _id: bookId, pageNumber: page },
    {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: 'Bearer ' + token
      }
    }
  );
  return data;
}
