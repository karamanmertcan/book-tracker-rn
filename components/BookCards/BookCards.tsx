import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface IBookCardsProps {
  bookName: string;
  bookAuthor: string;
  _id: string;
}

const BookCards: React.FunctionComponent<IBookCardsProps> = (props) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('BookDetailsScreen', {
          bookId: props._id
        });
      }}
      style={{
        width: '100%'
      }}>
      <View style={styles.gridView}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold'
            }}>
            {props.bookName}
          </Text>
          <Text
            style={{
              fontSize: 10
            }}>
            {props.bookAuthor}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20
  },
  gridView: {
    marginTop: 12,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 8
  }
});

export default BookCards;
