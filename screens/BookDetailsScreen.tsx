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

interface IBookDetailsScreenProps {}

const BookDetailsScreen: React.FunctionComponent<IBookDetailsScreenProps> = (props) => {
  const [token, setToken] = useAtom(myToken);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const route = useRoute<any>();
  const { bookId } = route.params;

  const { isLoading, isError, data, error, refetch } = useBookDetailsData(bookId, token);

  console.log('book ıd', data);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addPage = async (pageNumber: number, paramsBookId: string) => {
    try {
      const data = await BookService.addBookPage(paramsBookId, pageNumber, token);

      if (data) {
        refetch();
        return showMessage({
          message: 'Kitap Başarıyla Eklendi',
          type: 'success'
        });
      }

      showMessage({
        message: 'Kitap Eklenemedi',
        type: 'danger'
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (input: any) => {
    console.log('page number', input.pageNumber);
    console.log('page number', bookId);
    try {
      addPage(input.pageNumber, bookId);
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
      <View
        style={{
          backgroundColor: '#f2f',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text>Loading...</Text>
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
          Kitap Ayrıntıları
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
          {data &&
            data?.book &&
            data?.book?.readPages &&
            data?.book?.readPages?.map((book: any, index: any) => {
              return <UserReadList {...book} key={index} />;
            })}
        </ScrollView>
      </View>
      <AddPageModal
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

export default BookDetailsScreen;
