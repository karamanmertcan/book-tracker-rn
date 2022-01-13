import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface IQuotesCardsProps {
  bookName: string;
  bookAuthor: string;
  _id: string;
}

const QuotesCards: React.FunctionComponent<IQuotesCardsProps> = (props) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(`${'QuotesDetailsScreen'}`, {
          bookId: props._id,
          bookName: props.bookName
        });
      }}
      style={{
        width: wp('90%')
      }}>
      <View style={styles.gridView}>
        <View>
          <Text
            style={{
              fontSize: RFValue(14),
              fontWeight: 'bold'
            }}>
            {props.bookName}
          </Text>
          <Text
            style={{
              fontSize: RFValue(10)
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
    height: hp('30%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 8
  }
});

export default QuotesCards;
