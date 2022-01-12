import { useAtom } from 'jotai';
import * as React from 'react';
import { Text, View } from 'react-native';
import { userState } from '../../store';

interface IBookInfosProps {
  lastWeekPage: number;
  totalPage: number;
  book: number;
}

const BookInfos: React.FunctionComponent<IBookInfosProps> = (props) => {
  const [user, setUser] = useAtom(userState);

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
        <Text>{props.totalPage}</Text>
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
        <Text>{props.book}</Text>
      </View>
    </>
  );
};

export default BookInfos;
