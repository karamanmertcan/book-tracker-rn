import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
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
  ScrollView,
  Button
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { showMessage } from 'react-native-flash-message';
import Svg, { Path, SvgXml } from 'react-native-svg';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import * as UserService from '../api/services/User';

interface ILoginProps {
  outlineColor: string;
  selectionColor: string;
  activeOutlineColor: string;
}

const Register: React.FunctionComponent<ILoginProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const windowHeight = useWindowDimensions().height;
  const [spinner, setSpinner] = useState(false);

  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    reset,
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

        const data = await UserService.register(input.name, input.email, input.password);

        showMessage({
          message: 'Kayit basarili',
          type: 'success'
        });

        setSpinner(false);

        reset();
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
      <ScrollView
        style={{
          flex: 1
        }}>
        <View style={[{ minHeight: Math.round(windowHeight) }, styles.container]}>
          <Spinner
            visible={spinner}
            textContent={'Y??kleniyor...'}
            textStyle={{
              color: '#FFF'
            }}
          />
          <View style={styles.upperContainer}>
            <View
              style={{
                backgroundColor: '#2c3e50',
                height: 800,
                justifyContent: 'center'
              }}>
              <View
                style={{
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
                  marginTop: '5%',
                  minHeight: 300,
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
                  <RegisterForm
                    onSubmit={onSubmit}
                    control={control}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    page='login'
                  />
                  <View
                    style={{
                      marginTop: 10,
                      alignItems: 'center'
                    }}>
                    <TouchableOpacity
                      onPress={handleSubmit(onSubmit)}
                      style={{
                        width: 160,
                        height: 60,
                        backgroundColor: '#3498db',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30
                      }}>
                      <Text>Kay??t Ol</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <View
                      style={{
                        paddingVertical: 10,
                        alignItems: 'center'
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold'
                        }}>
                        Zaten hesab??n var m?? ? Giri?? Yap
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperContainer: {
    flex: 6,
    backgroundColor: '#fff',
    justifyContent: 'center'
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

export default Register;
