import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fab from '../components/Fab/Fab';
import ModalTester from '../components/Modal/Modal';
import { useNavigation } from '@react-navigation/native';

export default function TabTwoScreen() {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [bookName, setBookName] = useState('');
  const [bookInfos, setBookInfos] = useState({
    title: '',
    subtitle: ''
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getBookFromGoogle = async () => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);
    const data = await res.json();

    console.log(data.items[0]);

    setBookInfos({
      title: data.items[0].volumeInfo.title,
      subtitle: data.items[0].volumeInfo.authors[0]
    });

    setBookName('');
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
        <TouchableOpacity
          style={{
            width: '100%'
          }}
          onPress={() => navigation.navigate('BookDetailsScreen')}>
          <View style={styles.gridView}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>
                {bookInfos.title}
              </Text>
              <Text
                style={{
                  fontSize: 10
                }}>
                -{bookInfos.subtitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 10,
          zIndex: 1
        }}>
        <Fab toggleModal={toggleModal} />
      </View>
      <ModalTester
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        bookName={bookName}
        setBookName={setBookName}
        getBookFromGoogle={getBookFromGoogle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20
  },
  gridView: {
    marginTop: 12,
    width: '50%',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    marginRight: 10,
    paddingBottom: 8,
    borderRadius: 8
  }
});
