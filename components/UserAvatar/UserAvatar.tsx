import { useAtom } from 'jotai';
import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { userState } from '../../store';

interface IUserAvatarProps {
  avatarColor: string;
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  const [user, setUser] = useAtom(userState);

  return (
    <View style={[{ backgroundColor: props.avatarColor }, styles.avatar]}>
      {user?.user?.name.split(' ')[0] && user?.user?.name.split(' ')[1] ? (
        <>
          <Text style={styles.avatarText}>{user?.user?.name.split(' ')[0].slice(0, 1)}</Text>
          <Text style={styles.avatarText}>{user?.user?.name.split(' ')[1].slice(0, 1)}</Text>
        </>
      ) : (
        <>
          <Text style={styles.avatarText}>{user?.user?.name.split(' ')[0].slice(0, 1)}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    display: 'flex',
    flexDirection: 'row',
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
