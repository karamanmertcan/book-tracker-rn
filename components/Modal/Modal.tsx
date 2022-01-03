import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface IModal {
  isModalVisible: boolean;
  toggleModal: () => void;

  page?: string;
  handleSubmit: (fieldValues: any) => void;
  control: any;
  onSubmit: () => void;
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
            <Controller
              control={props.control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder='Kitap Adı'
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10
                  }}
                />
              )}
              name='book'
            />
            <View style={{ alignItems: 'center', marginTop: '10%' }}>
              <TouchableOpacity
                onPress={props.handleSubmit(props.onSubmit)}
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
