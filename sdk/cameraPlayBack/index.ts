import { NativeModules } from 'react-native';

const { CameraPlayBackModule } = NativeModules;

export const getVideoPlayBack = (devId:string, date:string) => {
    console.log(devId,date)
    return CameraPlayBackModule.getVideoPlayBack(devId, date);
};
