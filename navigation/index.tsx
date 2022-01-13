/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, Text, TouchableOpacity, ColorSchemeName, Pressable } from 'react-native';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions
} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import { useAtom } from 'jotai';
import { isAuthenticated } from '../store';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import QuotesDetailsScreen from '../screens/QuotesDetailsScreen';
import QuotesScreen from '../screens/QuotesScreen';

export default function Navigation({ colorScheme }: { colorScheme?: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function QuotesTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='TabFour' component={QuotesScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='QuotesDetailsScreen'
        component={QuotesDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BooksTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='BookScreen' component={TabTwoScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='BookDetailsScreen'
        component={BookDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const [isAuthenticatedUser] = useAtom(isAuthenticated);
  return (
    <Stack.Navigator>
      {!isAuthenticatedUser ? (
        <>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen
            name='Root'
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const Tabs = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Tabs.Navigator initialRouteName='TabOne'>
      <Tabs.Screen
        name='TabOne'
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Hesabım',
          headerShown: false,
          tabBarIcon: ({ color }: { color: any }) => <TabBarIcon name='user' color={color} />
        })}
      />
      <Tabs.Screen
        name='TabThree'
        component={LeaderboardScreen}
        options={{
          title: 'Liderlik Tablosu',
          headerShown: false,

          tabBarIcon: ({ color }: { color: any }) => <TabBarIcon name='signal' color={color} />
        }}
      />
      <Tabs.Screen
        name='TabTwo'
        component={BooksTab}
        options={{
          title: 'Kitaplarım',
          headerShown: false,

          tabBarIcon: ({ color }: { color: any }) => <TabBarIcon name='book' color={color} />
        }}
      />
      <Tabs.Screen
        name='Quotes'
        component={QuotesTab}
        options={{
          title: 'Notlarım',
          headerShown: false,

          tabBarIcon: ({ color }: { color: any }) => <TabBarIcon name='sticky-note' color={color} />
        }}
      />
    </Tabs.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
