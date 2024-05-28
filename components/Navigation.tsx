import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'

const Navigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200' }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200' }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200' }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200' }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  container: [
    tw`bottom-0 px-4 w-full mb-5`,
    {
      bottom: 0,
      paddingHorizontal: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  ],
  iconContainer: tw`mr-2`,
  icon: tw`w-12 h-12`,
}

export default Navigation
