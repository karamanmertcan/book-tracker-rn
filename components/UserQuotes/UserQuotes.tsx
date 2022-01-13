import moment from 'moment';
import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface IUserReadListProps {
  pageNumber: number;
  date: string;
  quote: string;
}

const UserQuotes: React.FunctionComponent<IUserReadListProps> = (props) => {
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
              {props.quote}
            </Text>
            <Text
              style={{
                color: 'white'
              }}>
              Tarih : {moment().format('LLLL')}
            </Text>
          </View>
        </Shadow>
      </View>
    </>
  );
};

export default UserQuotes;
