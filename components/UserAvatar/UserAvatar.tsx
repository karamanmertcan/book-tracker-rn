import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

interface IUserAvatarProps {
  avatarColor: string;
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  return (
    <View style={[{ backgroundColor: props.avatarColor }, styles.avatar]}>
      <Text style={styles.avatarText}>MK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2
  },
  avatarText: {
    fontSize: 50
  }
});

export default UserAvatar;
