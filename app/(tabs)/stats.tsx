import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'
import { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'

const leaderboard = [
  {
    id: '1',
    name: 'Zrah',
    username: 'Gideon Bedzrah',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    points: 110,
  },
  {
    id: '2',
    name: 'Exo',
    username: 'Exornam Yao',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    points: 60,
  },
  {
    id: '3',
    name: 'S.A.',
    username: 'Samuel Amanor',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    points: 40,
  },
  {
    id: '4',
    name: 'Kwazzy',
    username: 'Kwasi',
    avatar: 'https://randomuser.me/api/portraits/lego/4.jpg',
    points: 40,
  },
  {
    id: '5',
    name: 'Freddo',
    username: 'redfred',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    points: 30,
  },
  {
    id: '6',
    name: 'Nuna',
    username: 'Nunana',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    points: 20,
  },
  {
    id: '7',
    name: 'Super Stephen',
    username: 'Stephen',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    points: 10,
  },
]

export default function Stats() {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState('Leaderboard')

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: '#fff', 
        paddingTop: insets.top + 20,
      }}
    >
      <View className="px-4">
        <Header />

        {/* Tabs */}
        <View className="flex-row bg-gray-100 rounded-xl mt-4 mb-6 overflow-hidden">
          <TouchableOpacity
            onPress={() => setActiveTab('Leaderboard')}
            className={`flex-1 items-center py-3 ${
              activeTab === 'Leaderboard' ? 'bg-lime-300' : ''
            }`}
          >
            <Text className="font-poppins text-black">Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Achievements')}
            className={`flex-1 items-center py-3 ${
              activeTab === 'Achievements' ? 'bg-lime-300' : ''
            }`}
          >
            <Text className="font-poppins text-black">Achievements</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Leaderboard */}
      {activeTab === 'Leaderboard' && (
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 100,
            paddingHorizontal: 16,
            backgroundColor: '#0891b2', 
          }}
          renderItem={({ item, index }) => (
            <View className="flex-row items-center bg-white rounded-full mb-4 px-4 py-3">
              <Text className="w-6 text-black font-poppins mr-2">{index + 1}</Text>
              <Image
                source={{ uri: item.avatar }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <Text className="font-poppins text-sm text-black">{item.name}</Text>
                <Text className="font-poppins text-xs text-gray-500">{item.username}</Text>
              </View>
              <Text className="text-black font-poppins text-sm">★ {item.points}</Text>
            </View>
          )}
        />
      )}

      {/* Achievements Tab Placeholder */}
      {activeTab === 'Achievements' && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white font-poppins text-lg">No achievements yet</Text>
        </View>
      )}
    </View>
  )
}

