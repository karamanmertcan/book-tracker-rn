import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTHENTICATION_STORAGE_KEY = 'token';

export async function getAuthenticationToken() {
  const token: any = await AsyncStorage.getItem(AUTHENTICATION_STORAGE_KEY);
  const parse = JSON.parse(token);
  return parse;
}
