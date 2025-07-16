import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LogOut, ChevronRight } from 'lucide-react-native'

export default function ParentAccount() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1 bg-[#FFF2DF]"
      contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: 40 }}
    >
      {/* Header */}
      <Text className="text-center text-xl font-poppinsBold text-purple-800">Profile</Text>

      {/* Profile Image + Info */}
      <View className="items-center mt-6 mb-4">
        <View className="w-28 h-28 rounded-full border-4 border-black bg-[#FF8661] items-center justify-center">
          <Image
            source={require('@/assets/icons/user.png')}
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>
        <Text className="mt-2 text-2xl font-poppinsBold text-black">Elorm</Text>
        <Text className="text-sm text-black">★234</Text>
      </View>

      {/* Menu Section */}
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10 mx-2 shadow-sm">
        {[
          { title: 'Edit my profile', screen: 'edit-profile' },
          { title: 'Reading history', screen: 'reading-history' },
          { title: 'Customise your theme', screen: 'customise-theme' },
          { title: 'Change password', screen: 'change-password' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            // onPress={() => router.push(`/${item.screen}`)}
            className="flex-row justify-between items-center mb-5"
          >
            <View className="flex-row items-center space-x-3">
              <View className="w-4 h-4 bg-purple-400 rounded-full" />
              <Text className="text-base text-black font-poppins">{item.title}</Text>
            </View>
            <ChevronRight size={18} color="#333" />
          </TouchableOpacity>
        ))}

        {/* Log Out Button */}
        <TouchableOpacity className="bg-yellow-400 mt-6 py-3 rounded-full items-center">
          <Text className="text-black text-lg font-poppinsBold">log out</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Nav */}
      <View className="absolute bottom-4 left-5 right-5 rounded-full bg-lime-300 h-16 flex-row justify-around items-center border border-black">
        <TouchableOpacity>
          <Image source={require('@/assets/icons/sparkle.png')} className="w-6 h-6" />
        </TouchableOpacity>
        <View className="bg-white rounded-full p-3 border border-black">
          <Image source={require('@/assets/icons/user.png')} className="w-6 h-6" />
        </View>
        <TouchableOpacity>
          <Image source={require('@/assets/icons/book.png')} className="w-6 h-6" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
