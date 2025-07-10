import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import "global.css";      


export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center px-6" style={{ backgroundColor: '#5d198a' }}>
      <Text className="text-white text-4xl font-bold mb-4">Welcome</Text>
      <Text className="text-white text-base text-center mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec justo in quam pulvinar sagittis.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace('/(onboarding)/choose-role')}
        className="bg-white rounded-full px-6 py-3"
      >
        <Text className="text-[#5d198a] font-semibold text-base">Next</Text>
      </TouchableOpacity>

    </View>
  );
}
