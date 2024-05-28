import React from 'react';
import { RootStackParamList } from '../../types';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../Pages/Auth/Authentication';
import { NavigationContainer } from '@react-navigation/native';
import LoginForm from '../Pages/Auth/LoginPage';
import AuthLayout from './AuthLayout';
import WatchCamera from '../Pages/WatchCamera';
import ProfileScreen from '../Pages/Profile/ProfileScreen';
import AddNetWork from '../Pages/Device/AddNetWork';
import QRCodeScreen from '../Pages/Device/QRcode';
import GuestLayout from './GuestLayout';
import Home from '../Pages/Home';
import Register from '../Pages/Auth/Register';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="login"
                        component={LoginForm}
                        options={{ headerShown: false }}
                    />
                         <Stack.Screen name="register" component={Register} />
                    <>
                        <Stack.Screen
                            name="auth"
                            component={AuthLayout}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="watch" component={WatchCamera} />
                        <Stack.Screen name="profile" component={ProfileScreen} />

                        <Stack.Screen name="add_network" component={AddNetWork} />
                        <Stack.Screen name="guest" component={GuestLayout} />
                        <Stack.Screen name="QRCode" component={QRCodeScreen} />
                    </>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

const Drawer = createStackNavigator<RootStackParamList>();

export function Root() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="auth" component={AuthLayout} />
            <Drawer.Screen name="guest" component={GuestLayout} />
            <Drawer.Screen name="watch" component={WatchCamera} />
            <Drawer.Screen name="profile" component={ProfileScreen} />
            <Drawer.Screen name="QRCode" component={QRCodeScreen} />
            <Drawer.Screen
                name="login"
                component={LoginForm}
                options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}
export default AppNavigator;
