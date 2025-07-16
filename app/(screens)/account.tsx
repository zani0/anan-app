import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LogOut, ChevronRight } from 'lucide-react-native'

const screenHeight = Dimensions.get('window').height

export default function ParentAccount() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1 bg-[#FFF2DF]"
      contentContainerStyle={{ paddingTop: insets.top + 20 }}
    >
      {/* Header */}
      <Text className="text-center text-4xl font-caprasimo text-purple-800">Profile</Text>

      {/* Profile Image + Info */}
      <View className="items-center mt-6 mb-4">
        <View className="w-28 h-28 rounded-full border-4 border-black bg-[#FF8661] items-center justify-center mb-2">
          <Image
            source={require('@/assets/images/avatar.png')}
            className="w-16 h-16"
            resizeMode="contain"
          />
        </View>
        <Text className="mt-2 mb-2 text-4xl font-caprasimo text-black">Zoe</Text>
        <Text className="text-sm text-black mb-4">★234</Text>
      </View>

      {/* Menu Section */}
      <View
        className="bg-white rounded-t-3xl px-8 pt-6 pb-10"
        style={{
          minHeight: screenHeight - 250, 
        }}
      >
        <View className="space-y-6">
        {[
          { title: 'Edit my profile', screen: 'edit-profile' },
          { title: 'Reading history', screen: 'reading-history' },
          { title: 'Customise your theme', screen: 'customise-theme' },
          { title: 'Change password', screen: 'change-password' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            // onPress={() => router.push(`/${item.screen}`)}
            className="flex-row justify-between items-center mb-5 space-y-6"
          >
            <View className="flex-row items-center space-x-3">
              <View className="w-4 h-4 bg-purple-400 rounded-full mr-3" />
              <Text className="text-base text-black font-poppins">{item.title}</Text>
            </View>
            <ChevronRight size={18} color="#333" />
          </TouchableOpacity>
        ))}
        </View>
        {/* Log Out Button */}
        <TouchableOpacity className="bg-yellow-400 mt-6 py-3 rounded-full items-center">
          <Text className="text-black text-lg font-poppinsBold">Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
