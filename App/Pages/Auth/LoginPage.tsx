import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, Switch, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import { SendApi } from '../../../API/authApiTuya';
import CryptoJS from 'crypto-js';
import { User } from '../../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from './Authentication';

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();
    const { setIsAuthenticated } = useAuthContext();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            console.log(user)
            if (user !== null) {
                setIsAuthenticated(true);
                navigation.navigate('auth' as never);
            }
        } catch (error) {
            setIsAuthenticated(false);

        }
    };

    const handleLogin = async () => {
        if (username.trim() === "" || password.trim() === "") {
            Alert.alert("Missing Information", "Please provide both email/username and password.");
            return;
        }

        const method = 'POST';
        const path = `/v1.0/iot-03/users/login`;
        const body = {
            username: username,
            password: CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
        };
        try {
            const response = await SendApi(method, path, body);
            const { result } = response as { result: User };
            if (result === undefined) {
                Alert.alert("Login failed!", "");
                return;
            }
            const data = {
                ...result,
                'passworduser': password,
                'username':username
            }
            
            await AsyncStorage.setItem('user', JSON.stringify(data));
            setIsAuthenticated(true);
            navigation.navigate('auth' as never);

            Alert.alert("Login Successful!", "Welcome back!");
        } catch (error) {
            Alert.alert("Login failed!", `${error}`);
        }


    };

    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center pt-10`}>
            <Image source={{ uri: 'https://via.placeholder.com/300x200' }} style={tw`h-40 w-40`} resizeMode='contain' />
            <Text style={tw`text-3xl font-bold uppercase text-center pb-10 text-black`}>Login</Text>
            <View style={tw`w-full px-10 mb-2`}>
                <TextInput style={tw`h-12 px-5 border text-black border-red-500 rounded-lg mb-4`} placeholder='Email or Username' value={username} onChangeText={setUsername} autoCorrect={false} autoCapitalize='none' />
                <TextInput style={tw`h-12 px-5 border border-red-500 rounded-lg`} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false} autoCapitalize='none' />
            </View>
            <View style={tw`w-full px-12 flex justify-between items-center mb-2`}>
                <Switch value={rememberMe} onValueChange={setRememberMe} trackColor={{ true: 'green', false: 'gray' }} />
                <Text style={tw`text-sm text-black`}>Remember Me</Text>
            </View>
            <View style={tw`w-full px-12 mb-5`}>
                <Pressable style={tw`bg-red-500 h-12 rounded-lg justify-center items-center`} onPress={handleLogin}>
                    <Text style={tw`text-white text-lg font-bold`}>LOGIN</Text>
                </Pressable>
            </View>
            <Text style={tw`text-center text-gray-500`}>Don't have an account? <Text style={tw`text-red-500 text-sm`} onPress={() => navigation.navigate('register' as never)}>Sign Up</Text></Text>
        </SafeAreaView>
    );
}
