// import { useEffect } from 'react';
// import { View } from 'react-native';
// import TuyaIPCManager from 'tuya-ipc-sdk';

// const VideoPlayer = () => {
//   useEffect(() => {
//     async function playbackVideoFromSDCard() {
//       try {
//         // Initialize the Tuya IPC SDK
//         await TuyaIPCManager.initSDK();

//         // Get the device ID of the camera
//         const deviceId = 'your_camera_device_id';

//         // Open the video playback interface
//         await TuyaIPCManager.openVideoPlaybackInterface(deviceId);

//         // Get the list of video files on the SD card
//         const videoFiles = await TuyaIPCManager.getVideoFileList(deviceId);

//         // Select a video file to play back
//         const selectedVideo = videoFiles[0]; // or use a different selection method

//         // Start playing the video
//         await TuyaIPCManager.startPlaybackVideo(deviceId, selectedVideo.fileId);

//         // Add event listeners to handle video playback events
//         TuyaIPCManager.addListener('onPlaybackStatusChanged', (status) => {
//           console.log('Video playback status:', status);
//         });
//       } catch (error) {
//         console.error('Error playing back video:', error);
//       }
//     }

//     playbackVideoFromSDCard();

//     return () => {
//       // Clean up the Tuya IPC SDK when the component unmounts
//       TuyaIPCManager.destroy();
//     };
//   }, []);

//   return (
//     <View>
//       {/* Render the video player UI */}
//     </View>
//   );
// };