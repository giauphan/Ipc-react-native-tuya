import { View } from 'react-native'
import { HumanDetectionEvent } from '../../types'
import HumanDetectionLog from '../../components/HumanDetectionLog'
import { NavigationProp } from '@react-navigation/native'


const WatchCamera = ({ navigation }:{ navigation: NavigationProp<any>}) => {
  const events: HumanDetectionEvent[] = [
    { time: '08:37:39', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '08:28:17', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '07:29:39', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '07:27:41', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '07:20:29', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '08:37:39', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '08:28:17', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '07:29:39', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '07:27:41', thumbnail: 'https://via.placeholder.com/50x50' },
    { time: '07:20:29', thumbnail: 'https://via.placeholder.com/50x50' },
  ]

  return (
      <View>
        <HumanDetectionLog events={events} />
      </View>
  )
}

export default WatchCamera
