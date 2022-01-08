import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
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
import * as Animatable from 'react-native-animatable';
import QuoteModal from '../components/QuoteModal/QuoteModal';
const initialState = {
  bookName: '',
  author: ''
};

const MyCustomComponent = Animatable.createAnimatableComponent(View);

export default function QuotesScreen() {
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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          }}>
          <Animatable.Text
            animation='fadeInUp'
            style={{
              fontSize: RFValue(20),
              fontWeight: 'bold',
              color: '#fff',
              padding: 10
            }}>
            Notlarım
          </Animatable.Text>
        </View>
        <Animatable.View
          animation='fadeInUp'
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
        </Animatable.View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          right: 10,
          zIndex: 1
        }}></View>
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
    width: wp('100%'),
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
