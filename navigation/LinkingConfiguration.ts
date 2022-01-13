/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one'
            }
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
              BookDetailsScreen: 'book/:id'
            }
          },
          TabThree: {
            screens: {
              TabThreeScreen: 'three'
            }
          },
          Quotes: {
            screens: {
              TabFourScreen: 'four',
              QuotesDetailsScreen: 'quote/:id'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};

export default linking;
