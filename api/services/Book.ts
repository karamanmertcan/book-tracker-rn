import axios from 'axios';

export type Book = {
  _id: string;
  bookName: string;
  bookOwner: string;
  bookAuthor: string;
  readPages: Array<any>;
  createdAt: string;
};

export async function getBooks() {
  const { data } = await axios.get<Book>('/get-user-books');
  return data;
}
