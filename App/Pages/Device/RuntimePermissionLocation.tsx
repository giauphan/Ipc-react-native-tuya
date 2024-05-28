import { Platform, PermissionsAndroid, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const requestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } else if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
        }
    } catch (error) {
        console.error('Error requesting location permission:', error);
    }
};

const LocationComponent = () => {
    return (
        <Text
            onPress={() => requestLocationPermission()}>
            Yêu cầu quyền vị trí
        </Text>
    );
};

export default LocationComponent;
