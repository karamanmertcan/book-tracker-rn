import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fab from '../components/Fab/Fab';
import ModalTester from '../components/Modal/Modal';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import * as BookService from '../api/services/Book';
import axios from 'axios';
import { useAtom } from 'jotai';
import { myToken } from '../store';
import BookCards from '../components/BookCards/BookCards';

export default function TabTwoScreen() {
  // const getUserBooks = async () => {
  //   try {
  //     const { data } = await axios.get('/get-user-books', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [token, setToken] = useAtom(myToken);
  console.log('token => ' + token);

  const { isLoading, isError, data, error } = useQuery('books', () => BookService.getBooks(token));

  console.log('DATA', data);

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookInfos, setBookInfos] = useState({
    title: '',
    subtitle: ''
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getBookFromGoogle = async () => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);
    const data = await res.json();

    console.log(data.items[0]);

    setBookInfos({
      title: data.items[0].volumeInfo.title,
      subtitle: data.items[0].volumeInfo.authors[0]
    });

    setBookName('');
    toggleModal();
  };

  if (isError) {
    return (
      <View>
        <Text>Error!</Text>{' '}
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>retry: 10,</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
        {data && data.book && data.book.length !== 0 ? (
          data?.book?.map((book: any, index: any) => {
            return <BookCards {...book} key={index} />;
          })
        ) : (
          <View
            style={{
              flex: 1,

              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#fff'
              }}>
              Henüz kitap eklenmedi
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 10,
          zIndex: 1
        }}>
        <Fab toggleModal={toggleModal} />
      </View>
      <ModalTester
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        bookName={bookName}
        setBookName={setBookName}
        getBookFromGoogle={getBookFromGoogle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20
  },
  gridView: {
    marginTop: 12,
    width: '50%',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    marginRight: 10,
    paddingBottom: 8,
    borderRadius: 8
  }
});
