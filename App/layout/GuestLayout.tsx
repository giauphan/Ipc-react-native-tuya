import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Pages/Home'
import WatchCamera from '../Pages/WatchCamera'
import ProfileScreen from '../Pages/Profile/ProfileScreen'
import { createStackNavigator } from '@react-navigation/stack'
import LoginForm from '../Pages/Auth/LoginPage'

const Stack = createStackNavigator();

const GuestLayout = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={LoginForm}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        marginHorizontal: 20,
    },
})

export default GuestLayout
