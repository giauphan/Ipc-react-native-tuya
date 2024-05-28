import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { generateQrcode } from '../../../API/feat';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList, User } from '../../../types';
import { SendApi } from '../../../API/authApiTuya';
import { View } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WifiManager from "react-native-wifi-reborn";

type QRCodeScreenProps = NativeStackScreenProps<RootStackParamList, 'QRCode'>;

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ route }) => {
    const [token, setToken] = useState("");
    const { ssid, password } = route.params;
    const [ipAddress, setIpAddress] = useState<string | null>("");
    useEffect(() => {
        getToken();
        linkDevice();
        getIpAddress()
    }, []);

    const getToken = async () => {

        const method = 'POST';
        const path = `/v1.0/device/paring/token`;
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
            const body = {
                "uid": JSON.parse(user).uid,
                "timeZoneId": "Asia/Ho_Chi_Minh",
                "paring_type": "EZ"
            };

            const result = await SendApi(method, path, body);
            const token = (result as { result: { token: string } }).result.token;
            setToken(token)
        }
    }

    const linkDevice = async () => {
        if (ipAddress === null) {
            console.log('ipAddress', "null")
            return;
        }

        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
            const options = {
                ssid: ssid,
                apiKey: 'semd9njvunggem7srfv9',
                apiSecret: 'afd6f5b93c6b4e8b98097022506f7c94',
                password: password,
                schema: 'giauphancamerasmart',
                email: JSON.parse(user).email,
                passwordUser: JSON.parse(user).password,
                saveAPI: true,
                region: 'us',
                timezone: 'Asia/Ho_Chi_Minh',
                bindAddr: ipAddress,
                num: 5,
                save: true
            };
            
            try {
                const result = `tuya-cli link --api-key ${options.apiKey} --api-secret ${options.apiSecret} --schema ${options.schema} --ssid ${options.ssid} --password ${options.password} --region ${options.region} --bind-addr ${options.bindAddr} -t "${options.timezone} -n ${options.num} -s ${options.save}" `;
                console.log('Device linked successfully:', result);
            } catch (error) {
                console.error('Error linking device:', error);
            }
        }
    }

    const getIpAddress = async () => {
        try {
            WifiManager.getIP().then(ip => setIpAddress(ip), error => console.log(error));
        } catch (error) {
            console.error('Failed to get IP address', error);
        }
    };
    const dataUrl = generateQrcode(ssid, password, 'MhjMLSsx');
    console.log(dataUrl)
    return (
        <View style={tw`flex-1 items-center mt-10`}>
            <QRCode
                value={dataUrl}
                size={310}
                color="black"
                backgroundColor="white"
            />
        </View>

    )
};

export default QRCodeScreen;
