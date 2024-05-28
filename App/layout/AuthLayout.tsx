import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home';
import WatchCamera from '../Pages/WatchCamera';
import ProfileScreen from '../Pages/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const AuthLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              // <Ionicons
              //   name={focused ? 'camera-outline' : 'camera-reverse-outline'}
              //   size={size}
              //   color={color}
              // />
              <>
              </>
            );
          } else if (route.name === 'WatchCamera') {
            return (
              // <Ionicons
              //   name={focused ? 'camera-outline' : 'camera-reverse-outline'}
              //   size={size}
              //   color={color}
              // />
              <>
              </>
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="WatchCamera" component={WatchCamera} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AuthLayout;
