import { configMethod } from '@tuya/connector';
import { ProjectInfo, getDeviceInfoByDeviceId, getProjectInfo } from '@tuya/connector/dist/lib/apis';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import { Method } from 'axios';
import Config from 'react-native-config';

// Configuration object
const config = {
    host: 'https://openapi.tuyaus.com',
    accessKey: 'accessKey',
    secretKey: 'secretKey',
    deviceId: 'deviceId',
};

// Creating TuyaContext instance
const tuya = new TuyaContext({
    baseUrl: config.host,
    accessKey: config.accessKey,
    secretKey: config.secretKey,
});

const { initGlobalConfig, getGlobalConfig, setGlobalConfig } = configMethod;

initGlobalConfig({
    baseURL: 'https://openapi.tuyaus.com/v1.0',
    onError: () => { },
    
})

getGlobalConfig()
setGlobalConfig({})

export async function SendApi(method: Method, path: string, body: object = {}, query: object = {}) {
    const device = await tuya.request({
        method: method,
        path: path,
        body: body,
        query: query
    });

    return device
}
async function Send(method: Method, path: string) {

    const device = await tuya.request({
        method: method,
        path: path,
    });

    return device
}

export async function CheckStatusDevice(deviceId: string) {
    try {
        const path = `/v2.0/cloud/thing/batch?device_ids=${deviceId}`;

        const deviceDetails = await Send('GET', path);
        return deviceDetails;
    } catch (error) {
        console.error('Error occurred while checking device status:', error);
        throw error;
    }
}




export async function GetDeviceInfo(deviceID: string) {

    const token = await tuya.client.refreshToken();
    const deviceInfo = await getDeviceInfoByDeviceId('eb221345139aebce37uzve',{
        access_token:token
    }).then((res) => {
        if (res) {
            // Login is successful.
            console.log('logged in');
        } else {
            console.error('fail to login');
        }
    }).catch((err) => {
        // Failed to log in.
        console.error('login fail', err);
    });

    const res = await getProjectInfo().then((res) => {
        console.log(<ProjectInfo>res);
    })
        .catch((err) => {
            // Failed to log in.
            console.error('QR code fail', err);
        });

    return deviceInfo;
}


export   function generateRandomString(length:number) {
    const randomBytes = CryptoJS.lib.WordArray.random(length);
    const hexString = randomBytes.toString(CryptoJS.enc.Hex);
    
    return hexString.substring(0, length);
  }
