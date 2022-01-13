import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import BookInfos from '../components/BookInfos/BookInfos';
import Chart from '../components/Chart/Chart';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import { logoutUser, myToken, userState } from '../store';
import { RootTabScreenProps } from '../types';
import * as UserService from '../api/services/User';
import { useQuery } from 'react-query';
import { useIsFocused } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import * as BookService from '../api/services/Book';

interface Quotes {
  text: string;
  author: string;
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [avatarColor, setAvatarColor] = useState('');
  const [token, setToken] = useAtom(myToken);
  const [, setLogoutUser] = useAtom(logoutUser);
  const [quote, setQuote] = useState({} as Quotes);
  const [bookCount, setBookCount] = useState(0);

  const isFocused = useIsFocused();

  const { isLoading, isError, data, error, refetch } = useQuery(
    'userDetails',
    () => UserService.getUserDetails(token),
    {
      refetchInterval: 30000 // turned off by default, manual refetch is needed
    }
  );

  const getBooksLength = async () => {
    try {
      const data = await BookService.getBooks(token);

      setBookCount(data?.book?.length);
    } catch (error) {
      console.log(error);
    }
  };

  const [spinner, setSpinner] = useState(isLoading);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * Math.floor(1000));
  };

  const getQuotes = async () => {
    const res = await fetch('https://type.fit/api/quotes');
    const data = await res.json();

    if (data) {
      setQuote(data[generateRandomNumber()]);
    }
  };

  useEffect(() => {
    setAvatarColor(getRandomColor());
    getQuotes();
    getBooksLength();
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
      <ScrollView
        style={{
          flexGrow: 1
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}>
          <View
            style={{
              padding: hp(5)
            }}>
            <TouchableOpacity
              onPress={() => setLogoutUser()}
              style={{
                width: 100,
                height: 60,
                backgroundColor: '#3498db',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30
              }}>
              <Text>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>
          <Shadow>
            <View style={styles.motivationalQuote}>
              <Text style={styles.quoteText}>{quote.text}</Text>
              <Text style={styles.quoteText}>-{quote.author}</Text>
            </View>
          </Shadow>
        </View>

        <View
          style={{
            flex: 2,
            alignItems: 'center',
            marginTop: '10%'
          }}>
          <UserAvatar avatarColor={avatarColor} />
        </View>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            marginTop: '10%'
          }}>
          <View style={styles.bookInfos}>
            <BookInfos totalPage={data?.user[0]?.totalPage} book={bookCount} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingBottom: '20%',
            paddingTop: '10%'
          }}>
          <Chart />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50'
  },

  quoteText: {
    fontSize: 12
  },
  motivationalQuote: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 300,
    height: 100,
    padding: 20,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#c8d6e5'
  },
  bookInfos: {
    backgroundColor: '#c8d6e5',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ' 90%',
    height: 150,
    overflow: 'hidden'
  }
});
