import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import Navigation from './navigation';

import RootStackScreen from './navigation';
import { getTokenAndUserFromStorage, getUserFromStorage } from './store';

export default function Bootstrap() {
  useEffect(() => {
    console.log('bootstrap');
  }, []);

  return <Navigation />;
}
