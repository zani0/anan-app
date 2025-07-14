import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Bell } from 'lucide-react-native' 

const categories = [
  { label: 'History', icon: require('@/assets/icons/history.png') },
  { label: 'Science', icon: require('@/assets/icons/science.png') },
  { label: 'Folklore', icon: require('@/assets/icons/book.png') },
  { label: 'Culture', icon: require('@/assets/icons/world.png') },
  { label: 'Wildlife', icon: require('@/assets/icons/elephant.png') },
  { label: 'Legends', icon: require('@/assets/icons/torch.png') },
]

const featuredStories = [
  { id: '1', title: 'The Ashanti Kingdom', image: 'https://placehold.co/150x150/blue/white' },
  { id: '2', title: 'Rainforest Wonders', image: 'https://placehold.co/150x150/green/white' },
  { id: '3', title: 'How the Spider Saved the Village', image: 'https://placehold.co/150x150/purple/white' },
  { id: '4', title: 'How the Spider Saved the Village', image: 'https://placehold.co/150x150/purple/white' },
]

export default function HomeScreen() {
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
      {/* Greeting Section */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center gap-3">
          <Image
            source={require('@/assets/images/avatar.png')}
            className="w-10 h-10 rounded-full"
          />
          <View>
            <Text className="font-bold text-lg text-gray-800">Hello Zoe 👋</Text>
            <Text className="text-base text-gray-500">{greeting}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => console.log('Notifications')}>
          <Bell color="#5d198a" size={24} />
        </TouchableOpacity>
      </View>

      {/* Info Card */}
      <View className="bg-lime-100 rounded-2xl p-4 mb-6 h-[150px]">
        <Text className="text-[30px] font-semibold text-gray-800">
          Let's learn something new today!
        </Text>
        <Text className="text-sm text-gray-600">Discover fun stories and legends every day.</Text>
      </View>

      {/* Categories */}
      <Text className="text-base font-semibold text-gray-800 mb-2">Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.label}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="w-32 h-32 bg-lime-200 rounded-xl items-center justify-center space-y-2">
            <Image source={item.icon} className="w-24 h-10" resizeMode="contain" />
            <Text className="text-xs text-gray-800 font-poppins text-center">{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Featured Stories */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-base font-semibold text-gray-800">Featured Stories</Text>
        <Pressable onPress={() => console.log('See more pressed')}>
          <Text className="text-sm text-lime-600 font-medium">See more</Text>
        </Pressable>
      </View>

      <FlatList
        data={featuredStories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View className="w-40">
            <Image
              source={{ uri: item.image }}
              className="w-full h-[150px] rounded-xl mb-2"
              resizeMode="cover"
            />
            <Text className="text-sm font-medium text-gray-700">{item.title}</Text>
          </View>
        )}
      />
    </ScrollView>
  )
}
