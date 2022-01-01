import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserReadList from '../components/UserReadList/UserReadList';
import AddPageModal from '../components/AddPageModal/AddPageModal';

interface IBookDetailsScreenProps {}

const BookDetailsScreen: React.FunctionComponent<IBookDetailsScreenProps> = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [bookDate, setBookdate] = useState('');
  const [formData, setFormData] = useState({
    pageNumber: page,
    date: bookDate
  });

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
