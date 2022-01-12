import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
  Button
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFonts } from 'expo-font';
import { useAtom } from 'jotai';
import axios from 'axios';
import Svg, { Path, SvgXml } from 'react-native-svg';
import { showMessage } from 'react-native-flash-message';
import { useForm } from 'react-hook-form';
import AuthForm from '../components/AuthForm/AuthForm';
import * as UserService from '../api/services/User';
import { isAuthenticated, myToken, userState } from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILoginProps {
  outlineColor: string;
  selectionColor: string;
  activeOutlineColor: string;
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useAtom(isAuthenticated);
  const [user, setUser] = useAtom(myToken);
  const [spinner, setSpinner] = useState(false);

  const [state, setState] = useAtom(userState);
  const [errorMessage, setErrorMessage] = useState('');
  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (input: any) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(input.email) === false) {
      showMessage({
        message: 'Dogru bir email adresi giriniz',
        type: 'danger'
      });
    } else {
      try {
        setSpinner(true);

        UserService.login(input.email, input.password).then(async (res) => {
          if (res.ok) {
            await AsyncStorage.setItem('token', JSON.stringify(res.token));
            await AsyncStorage.setItem('user', JSON.stringify(res.user));
            setState({
              user: res.user,
              token: res.token
            });

            setUser(res.token);

            setIsAuthenticatedUser(true);
            setSpinner(false);
            showMessage({
              message: 'Giriş Başarılı',
              type: 'success'
            });
          }
        });
      } catch (error) {
        console.log(error);
        showMessage({
          message: errorMessage,
          type: 'danger'
        });
        setSpinner(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[{ minHeight: Math.round(windowHeight) }, styles.container]}>
        <Spinner
          visible={spinner}
          textContent={'Yükleniyor...'}
          textStyle={{
            color: '#FFF'
          }}
        />
        <View style={styles.upperContainer}>
          <View style={styles.svgCurve}>
            <View
              style={{
                backgroundColor: '#2c3e50',
                height: 600,
                justifyContent: 'center'
              }}>
              <Svg
                height='60%'
                width='100%'
                viewBox='0 0 1440 320'
                style={{ position: 'absolute', top: 440 }}>
                <Path
                  fill='#2c3e50'
                  d='M0,96L48,112C96,128,192,160,288,186.7C384
            ,213,480,235,576,213.3C672,192,768,128,864,
            128C960,128,1056,192,1152,208C1248,224,1344,192,
            1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,
            1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,
            384,0,288,0C192,0,96,0,48,0L0,0Z'
                />
              </Svg>
              <View
                style={{
                  marginTop: 50,
                  alignItems: 'center'
                }}>
                <Image
                  style={{
                    height: 100,
                    width: 100
                  }}
                  source={{
                    uri: 'https://i.imgur.com/TfufMLq.png'
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: '10%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                    Motive Hisset
                  </Text>
                </View>
                <View style={styles.formContainer}>
                  <AuthForm
                    control={control}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    page='login'
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={{
                      marginTop: 10
                    }}>
                    <View
                      style={{
                        padding: 10,
                        alignItems: 'center'
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                        Hesabın Yok Mu ?
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Button onPress={handleSubmit(onSubmit)} title='Giriş Yap' />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperContainer: {
    flex: 6,
    backgroundColor: '#fff'
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },

  logoName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  formContainer: {
    width: '90%',
    margin: '5%'
  }
});

export default Login;
