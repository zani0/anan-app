import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import "global.css";
import {
  Image

} from 'react-native';
export const unstable_settings = {
  initialRouteName: 'welcome',
};

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center px-6 bg-[#5d198a]">

      <Image
        source={require('@/assets/images/anansesem-logo-white.png')}
        className="w-[200px] h-[200px]"
        resizeMode="contain"
      />
      <Text className="mb-6">Anansesem</Text>


      <Text className="font-poppins text-[#D0EE30] text-4xl font-bold mb-4">Welcome</Text>
      <Text className="font-poppins text-white text-base text-center mb-8">
        Discover a world of imagination and learning! Create your own stories, explore a vast library and learn while you play. Anansesem brings stories to life, tailored just for you!
      </Text>

      <TouchableOpacity
        onPress={() => router.replace('/(onboarding)/choose-role')}
        className="bg-[#D0EE30] rounded-xl px-6 py-3 w-full"
      >
        <Text className="font-poppins text-[#5d198a] font-semibold text-base text-center">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
