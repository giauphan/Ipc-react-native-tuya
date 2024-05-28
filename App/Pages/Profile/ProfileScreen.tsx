import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useAuthContext } from '../Auth/Authentication';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout ,isAuthenticated } = useAuthContext();

  const handleLogout = async () => {
    await logout(); 
    navigation.navigate('login' as never); 
  };

  return (
    <View style={tw`flex-1 bg-blue-100 items-center`}>
      <View style={tw`mt-10 bg-white p-4 w-11/12 flex items-center`}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50x50' }}
          style={tw`w-24 h-24 rounded-full`}
        />
        <View style={tw` bg-white p-4 w-11/12 flex-row justify-between`}>
          <Text style={tw`text-base text-black`}>Cài đặt</Text>
          <TouchableOpacity style={tw`flex-row items-center justify-between py-2`}>
            <Text style={tw`text-base text-black`} onPress={handleLogout} >Logout</Text>
          </TouchableOpacity>
        </View>
        <Text style={tw`mt-4 text-lg font-bold text-black`}>Elena Skinova</Text>
      </View>
      <View style={tw` bg-white p-4  w-11/12`}>
        <TouchableOpacity style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-base text-black`}>WishList</Text>
          <Text style={tw`text-gray-500`}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-base text-black`}>Order History</Text>
          <Text style={tw`text-gray-500`}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-black text-base`}>Currency</Text>
          <Text style={tw`text-gray-500`}>{'>'}</Text>
        </TouchableOpacity>
        <View style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-black text-base`}>Languages</Text>
          <View style={tw`bg-blue-500 rounded-full w-4 h-4`} />
        </View>
        <View style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-black text-base`}>Notifications</Text>
          <View style={tw`bg-gray-500 rounded-full w-4 h-4`} />
        </View>
        <View style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-black text-base`}>Dark Theme</Text>
          <View style={tw`bg-gray-500 rounded-full w-4 h-4`} />
        </View>
        <TouchableOpacity style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-black text-base`}>Privacy Policy</Text>
          <Text style={tw`text-gray-500`}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;