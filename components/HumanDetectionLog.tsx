import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { HumanDetectionEvent } from '../types';
import RTSPVideoPlayer from './RTSPVideoPlayer';

import Config from 'react-native-config';
import { CheckStatusDevice, SendApi } from '../API/authApiTuya';
import axios from 'axios';

interface HumanDetectionLogProps {
  events: HumanDetectionEvent[];
}

const HumanDetectionEventItem: React.FC<{ event: HumanDetectionEvent }> = ({
  event,
}) => (
  <View style={tw`flex-row justify-between items-center  mb-2`}>
    <View style={tw`flex-row items-start gap-2`}>
      <Text style={tw`text-orange-500 `}>🧍</Text>
      <Text style={tw`text-gray-700`}>Human Detected</Text>

      <Text style={tw`text-gray-500 `}>{event.time}</Text>
    </View>
    <Image source={{ uri: event.thumbnail }} style={tw`w-12 h-12 rounded`} />
  </View>
);

const HumanDetectionLog: React.FC<HumanDetectionLogProps> = ({ events }) => {

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const device_id = 'eb221345139aebce37uzve'

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const status =await CheckStatusDevice(device_id)
        console.log(status)

        const method = 'POST';
        const path = `/v1.0/devices/${device_id}/stream/actions/allocate`;
        const body = {
          type: 'hls'
        };
        const response = await SendApi(method, path, body);
        const url = (response as { result: { url: string } }).result.url;
        setVideoUrl(url);
      } catch (error) {
        console.error('Failed to fetch video URL:', error);
      }
    };

    const checkStatusAndReload = async (url: string) => {
      try {
        const response = await axios.get(url);
        if (response.data.status === 'Not Found') {
          console.log('URL Not Found. Reloading...', url);
          fetchVideoUrl();
        }
      } catch (error) {
        console.error('Failed to check URL status:', error);
      }
    };

    fetchVideoUrl();
    const checkStatusInterval = setInterval(() => {
      if (videoUrl) {
        checkStatusAndReload(videoUrl);
      } else {
        fetchVideoUrl();
      }
    }, 60000);

    return () => clearInterval(checkStatusInterval);
  }, []); 

  return (
    <>
      <View style={tw`flex-col justify-between`}>


        <View style={tw`px-4 py-2`}>
          <Text style={tw`text-lg font-bold mb-2`}>HANH LAN</Text>

          {videoUrl && <RTSPVideoPlayer url={videoUrl} />}
        </View>
        <View style={styles.safeArea}>
          <FlatList
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <HumanDetectionEventItem event={item} />}
            contentContainerStyle={tw`p-4`}
          />
        </View>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    overflow: 'scroll',
    height: 350,
    bottom: 0
  },
});

export default HumanDetectionLog;
