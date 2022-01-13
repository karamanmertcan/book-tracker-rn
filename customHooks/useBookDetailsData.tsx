import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import * as BookService from '../api/services/Book';
import { myToken } from '../store';

const fetchBookDetails = (bookId: any, token: string) => {
  return BookService.getBookDetails(bookId, token);
};

export const useBookDetailsData = (bookId: any, token: string) => {
  return useQuery(['bookDetails', bookId], () => fetchBookDetails(bookId, token));
};
