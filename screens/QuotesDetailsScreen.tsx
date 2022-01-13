import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { useAtom } from 'jotai';
import { myToken } from '../store';
import * as BookService from '../api/services/Book';
import { showMessage } from 'react-native-flash-message';
import { useForm } from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import QuoteModal from '../components/QuoteModal/QuoteModal';
import UserQuotes from '../components/UserQuotes/UserQuotes';
import { useBookQuotes } from '../customHooks/useBookQuotes';

interface IQuotesDetailsScreenProps {}

const QuotesDetailsScreen: React.FunctionComponent<IQuotesDetailsScreenProps> = (props) => {
  const [token, setToken] = useAtom(myToken);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const route = useRoute<any>();
  const { bookId, bookName } = route.params;

  const { isLoading, isError, data, error, refetch } = useBookQuotes(bookId, token);

  const [spinner, setSpinner] = useState(isLoading);

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
        refetch();
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
      refetch();
    }
  }, []);

  if (isError) {
    return (
      <View>
        <Text>Error!</Text>
      </View>
    );
  }

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
        {data && data?.quotes && (
          <FlatList
            data={data.quotes}
            renderItem={({ item }) => (
              <UserQuotes {...item} keyExtractor={(item: any) => item._id} />
            )}
          />
        )}
      </View>
      <QuoteModal
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        control={control}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
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

export default QuotesDetailsScreen;
