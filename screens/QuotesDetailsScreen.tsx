import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import UserReadList from '../components/UserReadList/UserReadList';
import AddPageModal from '../components/AddPageModal/AddPageModal';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useAtom } from 'jotai';
import { myToken } from '../store';
import * as BookService from '../api/services/Book';
import { showMessage } from 'react-native-flash-message';
import { useForm } from 'react-hook-form';
import { useBookDetailsData } from '../customHooks/useBookDetailsData';
import { useBookQuotes } from '../customHooks/useBookQuotes';
import UserQuotes from '../components/UserQuotes/UserQuotes';
import QuoteModal from '../components/QuoteModal/QuoteModal';
import Spinner from 'react-native-loading-spinner-overlay';

interface IBookDetailsScreenProps {
  data: {
    quotes: [];
  };
}

const BookDetailsScreen: React.FunctionComponent<IBookDetailsScreenProps> = (props) => {
  const [token, setToken] = useAtom(myToken);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const route = useRoute<any>();
  const { bookId, bookName } = route.params;

  // const { isLoading, isError, data } = useBookQuotes(bookId, token);

  const [spinner, setSpinner] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<any>([]);

  const getSingleData = async (bookId: string) => {
    const data = await BookService.getBookQuotes(bookId, token);
    setData(data);
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

  const addQuote = async (bookId: string, bookName: string, quote: string) => {
    try {
      const data = await BookService.addQuotes(
        {
          bookId: bookId,
          bookName: bookName,
          quote: quote
        },
        token
      );

      if (data) {
        toggleModal();

        return showMessage({
          message: 'Alıntı Başarıyla Eklendi',
          type: 'success'
        });
      }

      showMessage({
        message: 'Alıntı Eklenemedi',
        type: 'danger'
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (input: any) => {
    try {
      addQuote(bookId, bookName, input.quote);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getSingleData(bookId);
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={{}}>
        <Spinner
          visible={spinner}
          textContent={'Yükleniyor...'}
          textStyle={{
            color: '#FFF'
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20
        }}>
        <TouchableOpacity
          style={{
            padding: 5
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={36} color='#fff' />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff'
          }}>
          Kitap Alıntılarım
        </Text>
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            padding: 5
          }}>
          <Ionicons name='add-circle-outline' size={36} color='#fff' />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 5
        }}>
        <ScrollView>
          {data && data?.quotes ? (
            data?.quotes?.map((book: any, index: any) => {
              return <UserQuotes {...book} key={index} />;
            })
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      </View>
      <QuoteModal
        control={control}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#2c3e50'
  }
});

export default BookDetailsScreen;
