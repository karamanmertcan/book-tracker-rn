import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';

interface IAuthFormProps {
  page: string;
  control: any;
  handleSubmit: (fieldValues: any) => void;
  errors: any;
}

const AuthForm: React.FC<IAuthFormProps> = (props: IAuthFormProps) => {
  return (
    <View>
      <Controller
        control={props.control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Email'
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10
            }}
          />
        )}
        name='email'
      />
      {props.errors.email && <Text>Email zorunludur !</Text>}

      <Controller
        control={props.control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Şifre'
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            secureTextEntry={true}
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10
            }}
          />
        )}
        name='password'
      />
      {props.errors.password && <Text>Şifre zorunludur !</Text>}
    </View>
  );
};

export default AuthForm;
