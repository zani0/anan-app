import {
    Text,
    View,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Header from '@/components/Header'

const savedStories = [
    {
        id: '1',
        title: 'Ameley and the honesty',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop',
        category: 'Folklore',
    },
    {
        id: '2',
        title: 'Ameley and the honesty',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop',
        category: 'Adventure',
    },
    {
        id: '3',
        title: 'Amilcar cabral the voice…',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop',
        category: 'Folklore',
    },
    {
        id: '4',
        title: 'Ananse and family',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop',
        category: 'Folklore',
        completed: true,
    },
        {
        id: '5',
        title: 'Ananse and family',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop',
        category: 'Folklore',
        completed: true,
    },
        {
        id: '6',
        title: 'Ananse and family',
        image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1074&auto=format&fit=crop',
        category: 'Folklore',
        completed: true,
    },
]

export default function Library() {
    const insets = useSafeAreaInsets()
    const [greeting, setGreeting] = useState('')
    const [username, setUsername] = useState('Zrah')

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting('Good Morning')
        else if (hour < 18) setGreeting('Good Afternoon')
        else setGreeting('Good Evening')
    }, [])

    const renderHeader = () => (
        <View style={{ paddingTop: insets.top + 20, paddingHorizontal: 16, marginBottom: 20 }}>
            {/* Greeting */}
            <Header />

            <Text className="font-poppins text-lg my-3">Find interesting stories and more...</Text>
            {/* Search Bar */}
            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                    placeholder="Search stories"
                    placeholderTextColor="#888"
                    className="ml-3 flex-1 text-base font-poppins"
                />
                <Ionicons name="options-outline" size={20} color="#888" />
            </View>
        </View>
    )

    return (
        <FlatList
            data={savedStories}
            keyExtractor={(item) => item.id}
            numColumns={2}
            style={{ backgroundColor: 'white' }}
            contentContainerStyle={{
                paddingBottom: 80,
            }}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                marginBottom: 16,
            }}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={<View style={{ height: 80 }} />}
            renderItem={({ item }) => (
                <TouchableOpacity className="w-[48%] rounded-[18px] overflow-hidden bg-gray-100">
                    <View className="relative w-full h-72">
                        <Image
                            source={{ uri: item.image }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        {item.completed && (
                            <View className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full">
                                <Text className="text-white text-xs font-poppins">completed</Text>
                            </View>
                        )}
                        <View className="absolute bottom-0 left-0 right-0 bg-black/50 px-5 py-5">
                            <Text className="text-white text-sm font-poppins mb-0.5" numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text className="text-lime-300 text-xs font-poppins">{item.category}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    )

}
