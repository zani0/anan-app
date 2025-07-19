import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import FloatingButton from '@/components/FloatingButton'
import { useRouter } from 'expo-router'

const categories = [
  { label: 'History', icon: require('@/assets/icons/history.png'), bgColor: '#FEE2E2' },
  { label: 'Science', icon: require('@/assets/icons/science.png'), bgColor: '#D1FAE5' },
  { label: 'Folklore', icon: require('@/assets/icons/book.png'), bgColor: '#E0E7FF' },
  { label: 'Culture', icon: require('@/assets/icons/world.png'), bgColor: '#FFF7CD' },
  { label: 'Wildlife', icon: require('@/assets/icons/elephant.png'), bgColor: '#DCFCE7' },
  { label: 'Legends', icon: require('@/assets/icons/torch.png'), bgColor: '#EDE9FE' },
]

const featuredStories = [
  {
    id: '1',
    title: 'The Lorem Ipsum',
    image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop',
    category: 'Adventure',
  },
  { 
    id: '2',
    title: 'Rainforest Wonders',
    image: 'https://images.unsplash.com/photo-1631582053308-40f482e7ace5?q=80&w=1631&auto=format&fit=crop',
    category: 'Wildlife',
  },
  {
    id: '3',
    title: 'How the Spider Saved the Village',
    image: 'https://plus.unsplash.com/premium_photo-1681426478241-11b262dd1d21?q=80&w=880&auto=format&fit=crop',
    category: 'Folklore',
  },
  {
    id: '4',
    title: 'The Talking Drum',
    image: 'https://images.unsplash.com/photo-1616098063625-65f32186e609?w=500&auto=format&fit=crop&q=60',
    category: 'Culture',
  },
]


export default function HomeScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning!')
    else if (hour < 18) setGreeting('Good afternoon!')
    else setGreeting('Good evening!')
  }, [])

  return (
    <ScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: 80 }}
    >
      <Header />


      {/* Info Card */}
      <View className="bg-[#a0c000be] rounded-2xl mb-8 h-[150px] justify-center px-4">
        <Text className="text-[26px] font-semibold text-white mb-1 text-left font-poppinsBold">
          Let's learn something new today!
        </Text>
        <Text className="text-md text-white text-left">
          Learn through wonderful stories to keep you smart.
        </Text>
      </View>

      {/* Categories */}
      <Text className="text-lg font-bold text-gray-800 mb-4 font-poppins">Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.label}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ backgroundColor: item.bgColor }}
            className="w-32 h-32 rounded-xl items-center justify-center space-y-2"
          >
            <Image source={item.icon} className="w-28 h-12" resizeMode="contain" />
            <Text className="text-md mt-5 text-gray-800 font-poppins text-center">{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Featured Stories */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-poppins text-gray-800">Featured Stories</Text>
        <TouchableOpacity onPress={() => console.log('See more pressed')} className="bg-lime-600 px-4 py-1 rounded-full">
          <Text className="text-sm text-white font-poppins">See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={featuredStories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-60 h-60"
            onPress={() => router.push({ pathname: '/story', params: { title: item.title, image: item.image, category: item.category } })}
          >
            <View className="w-full h-full rounded-xl overflow-hidden relative mb-2">
              <Image
                source={{ uri: item.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-4">
                <Text className="text-white text-md font-poppins mb-1">{item.title}</Text>
                <Text className="text-lime-300 text-sm font-poppins">{item.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <FloatingButton />

    </ScrollView>
  )
}
