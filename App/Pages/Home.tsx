import { Alert, Button, Linking, Modal, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react';
import { checkLocationPermission, requestLocationPermission } from '../Permissions/Location';
import WifiManager from "react-native-wifi-reborn";
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({ navigation }: { navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    handleLocationAccess();
  }, []);

  async function handleLocationAccess() {
    const hasPermission = await checkLocationPermission();
    if (!hasPermission) {
      const granted = await requestLocationPermission();
      if (granted) {
      } else {
        console.log('Location permission denied');
      }
    } else {
      try {
        await WifiManager.getCurrentWifiSSID();
        setModalVisible(false)
      } catch (error) {
        setModalVisible(true)
      }
    }

  }

  const openLocationSettings = () => {
    Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
      .catch(err => console.error('Could not open location settings', err));
    setModalVisible(false)
  };


  return (
    <>
      <Button
        title="add device camera "
        onPress={() => navigation.navigate('add_network', { name: 'video' })}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={tw`flex flex-1 items-center justify-center`}>
          <View style={tw`flex flex-col gap-3 p-2 border border-gray-200 `}>
            <View style={tw`flex justify-end flex-row`}>
              <Text style={styles.closeButton} onPress={() => setModalVisible(false)}>X</Text>
            </View>
            <View style={tw`flex flex-row justify-between `}>
              <TouchableOpacity style={tw`p-4`} >
                <Text onPress={() => setModalVisible(false)} style={tw`text-black border border-gray-300`}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`p-4`}>
                <Text style={tw`text-black`} onPress={openLocationSettings}>Cài đặt</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </Modal>

    </>

  )

}
const styles = StyleSheet.create({
  closeButton: {
    color: 'black',
    fontSize: 18,
  },
});


export default Home
