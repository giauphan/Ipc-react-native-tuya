import React from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import tw from 'twrnc'

interface DesignerCardProps {
  name: string;
  title: string;
  category: number;
  products: number;
  likes: number;
  attention: number;
}

const DesignerCard: React.FC<DesignerCardProps> = ({
  name,
  title,
  products,
  category,
  likes,
  attention,
}) =>(
  <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
    <View style={tw`flex-row items-center`}>
      <Image
        source={{ uri: 'https://via.placeholder.com/50x50' }}
        style={tw`w-12 h-12 rounded-full mr-4`}
      />
      <View>
        <Text style={tw`font-bold text-lg`}>{name}</Text>
        <Text style={tw`text-gray-600`}>{title}</Text>
      </View>
    </View>
    <View style={tw`flex-row items-center mt-4`}>
      <View style={tw`flex-row items-center mr-4`}>
        <Text style={tw`font-bold text-gray-600 mr-2`}>{products}</Text>
        <Text style={tw`text-gray-500`}>Products</Text>
      </View>
      <View style={tw`flex-row items-center mr-4`}>
        <Text style={tw`font-bold text-gray-600 mr-2`}>{likes}</Text>
        <Text style={tw`text-gray-500`}>Likes</Text>
      </View>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`font-bold text-gray-600 mr-2`}>{attention}</Text>
        <Text style={tw`text-gray-500`}>Attention</Text>
      </View>
    </View>
  </View>
)

const DesignerList = () => {
  const designers = [
    {
      name: 'David Borg',
      title: 'Flying wings',
      category: 1,
      products: 204,
      likes: 478,
      attention: 1,
    },
    {
      name: 'Lucy',
      title: 'Growing up stories',
      category: 2,
      products: 178,
      likes: 356,
      attention: 2,
    },
    // Add more designers here
  ]

  return (
    <View style={tw`p-4`}>
      {designers.map((designer, index) => (
        <DesignerCard
          key={index}
          name={designer.name}
          title={designer.title}
          category={designer.category}
          products={designer.products}
          likes={designer.likes}
          attention={designer.attention}
        />
      ))}
    </View>
  )
}

export default DesignerList
