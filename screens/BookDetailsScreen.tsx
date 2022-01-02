import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserReadList from '../components/UserReadList/UserReadList';
import AddPageModal from '../components/AddPageModal/AddPageModal';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useAtom } from 'jotai';
import { myToken } from '../store';

interface IBookDetailsScreenProps {}

const BookDetailsScreen: React.FunctionComponent<IBookDetailsScreenProps> = (props) => {
  const [token, setToken] = useAtom(myToken);
  const [isModalVisible, setModalVisible] = useState(false);
  const route = useRoute<any>();
  const { bookId } = route.params;
  const [page, setPage] = useState(0);
  const [bookDate, setBookdate] = useState('');
  const [formData, setFormData] = useState({
    pageNumber: page,
    date: bookDate
  });

  const getBookDetails = async () => {
    try {
      const { data } = await axios.get(`/get-single-book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const { isLoading, isError, data, error } = useQuery('booksDetails', () => getBookDetails(), {
    retry: 10
  });

  console.log('details book', data);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20
        }}>
        <TouchableOpacity
          style={{
            padding: 5
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={36} color='#fff' />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff'
          }}>
          Kitap Ayrıntıları
        </Text>
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            padding: 5
          }}>
          <Ionicons name='add-circle-outline' size={36} color='#fff' />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 5
        }}>
        <ScrollView>
          <UserReadList />
          <UserReadList />
          <UserReadList />
          <UserReadList />
          <UserReadList />
          <UserReadList />
        </ScrollView>
      </View>
      <AddPageModal toggleModal={toggleModal} isModalVisible={isModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#2c3e50'
  }
});

export default BookDetailsScreen;
