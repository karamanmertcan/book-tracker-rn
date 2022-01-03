import * as React from 'react';
import { Text, View } from 'react-native';

interface IRankUsersProps {
  name: string;
  index: number;
  totalPage: number;
}

const RankUsers: React.FunctionComponent<IRankUsersProps> = (props) => {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 80,
        width: '100%',
        backgroundColor: '#3498db',
        marginBottom: '5%',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center'
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
          {props.index + 1}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center'
        }}>
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
          {props.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff'
          }}>
          Puan
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff'
          }}>
          {props.totalPage}
        </Text>
      </View>
    </View>
  );
};

export default RankUsers;
