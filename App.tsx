import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getTokenAndUserFromStorage } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProvider } from './context';

interface StatusBar {
  statusBarHeight: any;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  const [getUser, setGetUserFromStorage] = useAtom(getTokenAndUserFromStorage);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    setGetUserFromStorage();
    console.log(getUser);
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UserProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <FlashMessage position='top' statusBarHeight={'50'} autoHide={true} />
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </QueryClientProvider>
        </SafeAreaProvider>
      </UserProvider>
    );
  }
}
