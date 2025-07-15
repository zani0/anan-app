import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'

const profiles = [
    {
        id: '1',
        name: 'Ama',
        image: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
    },
    {
        id: '2',
        name: 'Kojo',
        image: { uri: 'https://randomuser.me/api/portraits/men/15.jpg' },
    },
    //   {
    //     id: '3',
    //     name: 'Afia',
    //     image: { uri: 'https://randomuser.me/api/portraits/women/65.jpg' },
    //   },
    //   {
    //     id: '4',
    //     name: 'Yaw',
    //     image: { uri: 'https://randomuser.me/api/portraits/men/72.jpg' },
    //   },
    //   {
    //     id: '5',
    //     name: 'Esi',
    //     image: { uri: 'https://randomuser.me/api/portraits/women/12.jpg' },
    //   },
    //   {
    //     id: '6',
    //     name: 'Kwame',
    //     image: { uri: 'https://randomuser.me/api/portraits/men/33.jpg' },
    //   },
]

export default function ChooseProfile() {
    const router = useRouter()
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const handleContinue = () => {
        if (!selectedId) return
        router.replace('/(tabs)')
    }

    const renderProfile = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => setSelectedId(item.id)}
            className="items-center w-[100px] self-center"
        >
            <Image
                source={item.image}
                className={`w-[100px] h-[100px] rounded-full mb-2 ${selectedId === item.id ? 'border-4 border-[#D0EE30]' : ''
                    }`}
                resizeMode="cover"
            />
            <Text className="text-white font-poppins text-sm text-center">{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <View className="flex-1 bg-[#5d198a] relative">
            {/* Spiderwebs */}
            <Image
                source={require('@/assets/images/spider-web-1.png')}
                className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
                resizeMode="cover"
            />
            <Image
                source={require('@/assets/images/spider-web-2.png')}
                className="w-[170px] h-[80px] absolute bottom-0 left-0"
                resizeMode="cover"
            />

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 24,
                    paddingVertical: 48,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full max-w-[360px]">
                    {/* Title */}
                    <Text className="text-[30px] font-caprasimo text-[#D0EE30] text-center mb-4">
                        Who’s watching?
                    </Text>

                    {/* Subtitle */}
                    <Text className="font-poppins text-white text-base text-center mb-8">
                        Select a profile to continue learning
                    </Text>

                    {/* Grid of Profiles */}
                    <FlatList
                        data={[...profiles, { id: 'new', name: 'Add Profile', image: null }]}
                        numColumns={3}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: 20 }}
                        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 20 }}
                        renderItem={({ item }) =>
                            item.id === 'new' ? (
                                <TouchableOpacity
                                    onPress={() => router.push('/verify-age')}
                                    className="items-center w-[100px] self-center"
                                >
                                    <View className="w-[100px] h-[100px] rounded-full bg-white justify-center items-center mb-2">
                                        <Text className="text-[#5d198a] text-5xl">+</Text>
                                    </View>
                                    <Text className="text-white font-poppins text-sm text-center">
                                        Add
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                renderProfile({ item })
                            )
                        }
                    />

                    {/* Continue Button */}
                    <TouchableOpacity
                        disabled={!selectedId}
                        onPress={handleContinue}
                        className={`py-3 px-10 rounded-xl w-full mt-6 ${selectedId ? 'bg-[#D0EE30]' : 'bg-[#D0EE30]/40'
                            }`}
                    >
                        <Text
                            className={`font-poppinsBold text-[18px] text-center ${selectedId ? 'text-[#5d198a]' : 'text-[#5d198a]/50'
                                }`}
                        >
                            Continue
                        </Text>
                    </TouchableOpacity>

                    {/* Continue as Parent */}
                    <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                        <Text className="text-white font-poppins text-sm text-center underline mt-6">
                            Continue with parent account instead
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
