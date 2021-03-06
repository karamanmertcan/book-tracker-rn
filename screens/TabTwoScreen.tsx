import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Fab from '../components/Fab/Fab';
import ModalTester from '../components/Modal/Modal';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import * as BookService from '../api/services/Book';
import axios from 'axios';
import { useAtom } from 'jotai';
import { myToken } from '../store';
import BookCards from '../components/BookCards/BookCards';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
const initialState = {
  bookName: '',
  author: ''
};

export default function TabTwoScreen() {
  const [token, setToken] = useAtom(myToken);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const [book, setBook] = useState({});

  //get books
  const { isLoading, isError, data, refetch } = useQuery(
    'books',
    () => BookService.getBooks(token),
    {
      refetchOnWindowFocus: false,
      enabled: false // turned off by default, manual refetch is needed
    }
  );

  const [spinner, setSpinner] = useState(isLoading);

  //add book
  const addBook = async (name: string, author: string) => {
    try {
      const data = await BookService.addBook(
        {
          bookName: name,
          bookAuthor: author
        },
        token
      );

      if (data) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSubmit = async (input: any) => {
    try {
      getBookFromGoogle(input.book);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const getBookFromGoogle = async (book: string) => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
      const data = await res.json();

      if (!data) {
        showMessage({
          message: 'Kitap bulunamadi',
          type: 'danger'
        });
      }

      addBook(data.items[0].volumeInfo.title, data.items[0].volumeInfo.authors[0]);

      showMessage({
        message: 'Kitap Eklendi',
        type: 'success'
      });

      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, []);

  if (isError) {
    return (
      <View
        style={{
          backgroundColor: '#f2f',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>Error...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Spinner
          visible={spinner}
          textContent={'Y??kleniyor...'}
          textStyle={{
            color: '#FFF'
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          }}>
          <Text
            style={{
              fontSize: RFValue(20),
              fontWeight: 'bold',
              color: '#fff',
              padding: 10
            }}>
            Kitaplar??m
          </Text>
        </View>
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
                Hen??z kitap eklenmedi
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          right: 10,
          zIndex: 1
        }}>
        <Fab toggleModal={toggleModal} />
      </View>
      <ModalTester
        control={control}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        addBook={addBook}
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
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
