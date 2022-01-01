import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { DatePicker } from '../DatePicker/DatePicker';

interface IModal {
  isModalVisible: boolean;
  toggleModal: () => void;
}

const AddPageModal: React.FC<IModal> = (props) => {
  return (
    <KeyboardAvoidingView>
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
              style={{
                flex: 6,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <ScrollView>
                <View style={{ height: 200 }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                    Sayfa Sayısı ve Tarih Giriniz
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      height: 40,
                      padding: 8
                    }}
                    keyboardType='number-pad'
                    onChangeText={props.setBookName}
                    value={props.bookName}
                    placeholder='Sayfa Sayısı'
                  />
                  <DatePicker />
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
                        Ekle
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddPageModal;
