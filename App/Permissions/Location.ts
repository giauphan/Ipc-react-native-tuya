import { Alert, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS, check, checkLocationAccuracy } from 'react-native-permissions';

export async function requestLocationPermission() {
    const permission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    if (!permission) {
        throw new Error('Unsupported platform for location permission');
    }

    const result = await request(permission, {
        title: 'Location Permission',
        message: 'This app needs access to your location',
        buttonPositive: 'OK',
    });

    return result === RESULTS.GRANTED;
}

export async function checkLocationPermission() {
    const permission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    if (!permission) {
        throw new Error('Unsupported platform for location permission');
    }

    const result = await check(permission);
    return result === 'granted';
}

export async function checkLocation() {

    try {
        const accuracy = await checkLocationAccuracy();
        Alert.alert("Missing Information", `your turn location`);
        return true; 
    } catch (error) {
        Alert.alert("Missing Information", `eror get SSID ${error}`);
        return false;
    }

}