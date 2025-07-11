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

      {/* <View className="items-center mb-20">
        <Image
          source={require('@/assets/images/anansesem-logo-white.png')}
          className="h-[100px]"
          resizeMode="center"
        />
        <Text className="text-[35px] font-caprasimo text-[#D0EE30]">Anansesem</Text>
      </View> */}

      <Text className="font-poppins text-[#D0EE30] text-4xl mb-4">Welcome</Text>
      <Text className="font-poppins text-white text-base text-center mb-8">
        Before letting your child explore Anansesem, take a few minutes to decide on important parental safety controls
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
