import { useQuery } from 'react-query';
import * as BookService from '../api/services/Book';

const fetchBookQuotes = (bookId: any, token: string) => {
  return BookService.getBookQuotes(bookId, token);
};

export const useBookQuotes = (bookId: any, token: string) => {
  return useQuery(['bookQuotes', bookId], () => fetchBookQuotes(bookId, token));
};
