import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface IUserReadListProps {}

const UserReadList: React.FunctionComponent<IUserReadListProps> = (props) => {
  return (
    <>
      <View
        style={{
          width: '90%',
          margin: '5%'
        }}>
        <Shadow>
          <View
            style={{
              height: 100,
              width: Dimensions.get('window').width - 100,
              overflow: 'hidden',
              borderRadius: 30,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text
              style={{
                color: 'white'
              }}>
              Okuduğum Sayfa Sayısı : 10
            </Text>
            <Text
              style={{
                color: 'white'
              }}>
              Tarih : 10.10.2020
            </Text>
          </View>
        </Shadow>
      </View>
    </>
  );
};

export default UserReadList;
