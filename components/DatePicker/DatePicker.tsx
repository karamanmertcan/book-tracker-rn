import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TouchableOpacity onPress={() => showDatepicker()}>
          <View
            style={{
              width: 150,
              height: 50,
              backgroundColor: '#3498db',
              borderRadius: 20,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text>Tarih Seç</Text>
          </View>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  );
};
