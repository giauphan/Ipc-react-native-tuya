import Video from 'react-native-video';
import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import tw from 'twrnc';

interface RTSPVideoPlayerProps {
  url: string;
}

const RTSPVideoPlayer: React.FC<RTSPVideoPlayerProps> = ({ url }) => {

  const videoRef = useRef<Video>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAudio} style={tw`bg-blue-500 p-2 rounded-full absolute top-4 right-4 z-10`}>
        <Text style={tw`text-white`}>{isMuted ? 'Unmute' : 'Mute'}</Text>
      </TouchableOpacity>
      <Video
        ref={videoRef}
        source={{ uri: url }}
        resizeMode="cover"
        style={tw`w-full h-48 rounded-lg mb-4`}
      />
    </View>
  );
};

export default RTSPVideoPlayer;
