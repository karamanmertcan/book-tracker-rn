import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import * as BookService from '../api/services/Book';
import { myToken } from '../store';

const fetchBooks = (token: string) => {
  return BookService.getBooks(token);
};

export const useGetBooks = (token: string) => {
  return useQuery(['books'], () => fetchBooks(token));
};
