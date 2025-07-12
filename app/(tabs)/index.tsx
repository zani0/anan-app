import { ScrollView, Text, View, FlatList, Image, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const categories = ['History', 'Science', 'Folklore', 'Culture', 'Wildlife', 'Legends']

const featuredStories = [
  { id: '1', title: 'The Ashanti Kingdom', image: 'https://placehold.co/150x100' },
  { id: '2', title: 'Rainforest Wonders', image: 'https://placehold.co/150x100' },
  { id: '3', title: 'How the Spider Saved the Village', image: 'https://placehold.co/150x100' },
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
      {/* Greeting */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800">Hello Zoe 👋</Text>
        <Text className="text-base text-gray-500">{greeting}</Text>
      </View>

      {/* Info Card */}
      <View className="bg-lime-100 rounded-2xl p-4 mb-6">
        <Text className="text-lg font-semibold text-gray-800">Explore New Adventures</Text>
        <Text className="text-sm text-gray-600">Discover fun stories and legends every day.</Text>
      </View>

      {/* Categories */}
      <Text className="text-base font-semibold text-gray-800 mb-2">Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View className="bg-lime-200 px-4 py-2 rounded-full">
            <Text className="text-sm font-medium text-gray-800">{item}</Text>
          </View>
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
              className="w-full h-24 rounded-xl mb-2"
              resizeMode="cover"
            />
            <Text className="text-sm font-medium text-gray-700">{item.title}</Text>
          </View>
        )}
      />
    </ScrollView>
  )
}
