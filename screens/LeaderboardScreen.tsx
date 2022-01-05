import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fab from '../components/Fab/Fab';
import ModalTester from '../components/Modal/Modal';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import * as UserService from '../api/services/User';
import axios from 'axios';
import { useAtom } from 'jotai';
import { myToken } from '../store';
import BookCards from '../components/BookCards/BookCards';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import RankUsers from '../components/RankUsers/RankUsers';

const initialState = {
  bookName: '',
  author: ''
};

export default function LeaderboardScreen() {
  const [token, setToken] = useAtom(myToken);

  const navigation = useNavigation();

  //get users
  const { isLoading, isError, data, refetch } = useQuery(
    'rankUsers',
    () => UserService.getLeaderboardUsers(token),
    {
      refetchInterval: 10000 // turned off by default, manual refetch is needed
    }
  );

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
        <Text></Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff'
          }}>
          Liderlik Sıralaması
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column'
          }}>
          <View
            style={{
              height: 50,
              width: Dimensions.get('window').width - 50,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff'
              }}>
              Sıra
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff'
              }}>
              İsim
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff'
              }}>
              Puan
            </Text>
          </View>
          {data && data.user && data.user.length !== 0 ? (
            data?.user?.map((user: any, index: any) => {
              return <RankUsers {...user} key={index} index={index} />;
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
                Hiç Kullanıcı Bulunamadı
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
