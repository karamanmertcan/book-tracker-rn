import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface IModal {
  isModalVisible: boolean;
  toggleModal: () => void;
  bookName: string;
  setBookName: (value: string) => void;
  getBookFromGoogle: () => void;
}

const ModalTester: React.FC<IModal> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={props.isModalVisible}
        backdropColor='#fff'
        backdropOpacity={0.8}
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={props.toggleModal}>
            <Ionicons name='close' size={48} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View style={{ height: 200 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
              Eklemek İstediğiniz Kitap Adını Giriniz
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                height: 40,
                padding: 8
              }}
              onChangeText={props.setBookName}
              value={props.bookName}
              placeholder='Book Name'
            />
            <View style={{ alignItems: 'center', marginTop: '10%' }}>
              <TouchableOpacity
                onPress={props.getBookFromGoogle}
                style={{
                  width: '50%',
                  height: 50,
                  borderRadius: 20,
                  backgroundColor: '#3498db',
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20
                  }}>
                  Kitap Ekle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalTester;
