import * as React from 'react';
import { Text, View } from 'react-native';

interface IBookInfosProps {}

const BookInfos: React.FunctionComponent<IBookInfosProps> = (props) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Text
          style={{
            fontSize: 16,

            fontWeight: 'bold'
          }}>
          Okuduğum Sayfa Sayısı
        </Text>
        <Text>150</Text>
      </View>
      <View
        style={{
          width: 2,
          height: '100%',
          backgroundColor: '#E0E0E0'
        }}></View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold'
          }}>
          Okuduğum Kitap Sayısı
        </Text>
        <Text>1</Text>
      </View>
    </>
  );
};

export default BookInfos;
