import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IFabProps {
  toggleModal: () => void;
}

const Fab: React.FunctionComponent<IFabProps> = (props) => {
  return (
    <>
      <TouchableOpacity
        onPress={props.toggleModal}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,

          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100
        }}>
        <Ionicons name='add-outline' size={30} color='#01a699' />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {}
});

export default Fab;
