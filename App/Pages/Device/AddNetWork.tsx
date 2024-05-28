import { Alert, Button, Text, View } from 'react-native'
import { useEffect, useState } from 'react';
import tw from 'twrnc';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WifiManager, { ConnectToProtectedSSIDParams } from "react-native-wifi-reborn";

const AddDevice = ({ navigation }: { navigation: any }) => {
    const [password, setPassword] = useState("");
    const [SSID, setSSID] = useState("");

    useEffect(() => {
        getSsid();
        getIpAddress()
    }, []);

    const getSsid = async () => {
        try {

            const currentSSID = await WifiManager.getCurrentWifiSSID();
            console.log(currentSSID)
            setSSID(currentSSID)
        } catch (error) {
            Alert.alert("Missing Information", `eror get SSID ${error}`);
        }
    }

    const navigateToQRCode = async () => {
        const configWifi: ConnectToProtectedSSIDParams = {
            ssid: SSID,
            password: password
        }
        await AsyncStorage.setItem('wifi', JSON.stringify(configWifi));
        navigation.navigate('QRCode', {
            ssid: SSID, password: password
        });

    };

    const getIpAddress = async () => {
        try {
            WifiManager.getIP().then(ip => console.log(ip), error => console.log(error));
        } catch (error) {
            console.error('Failed to get IP address', error);
        }
    };


    return (
        <>
            <Text style={tw`text-black text-center text-lg mt-10`}>Kết nối wifi</Text>
            <View style={tw`w-full px-10 mt-10 flex flex-col gap-2`}>
                <Text style={tw`text-black`}>Tên Wifi</Text>
                <TextInput
                    style={tw`h-12 px-5 border border-red-500 rounded-lg mb-4 text-black placeholder:text-black`}
                    placeholder='Nhập ssid'
                    value={SSID}
                    autoCorrect={false}
                    autoCapitalize='none'
                    editable={SSID !== "" ? false : true}
                />

            </View>
            <View style={tw`w-full px-10 mb-2 mt-2 flex flex-col gap-2`}>
                <Text style={tw`text-black`}> Mật khẩu</Text>
                <TextInput style={tw`h-12 px-5 border border-red-500 rounded-lg`} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false} autoCapitalize='none' />
            </View>
            <View style={tw`flex items-center mt-4`}>
                <Button title="Next" onPress={navigateToQRCode} />
            </View>
        </>

    )
}

export default AddDevice
