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
    <View className="flex-1 justify-center items-center px-6 bg-[#60178b]">

      {/* Top Right Spiderweb */}
      <Image
        source={require('@/assets/images/spider-web-1.png')}
        className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
        resizeMode="cover"
      />

      {/* Bottom Left Spiderweb */}
      <Image
        source={require('@/assets/images/spider-web-2.png')}
        className="w-[170px] h-[80px] absolute bottom-0 left-0"
        resizeMode="cover"
      />

      {/* <View className="items-center mb-20">
        <Image
          source={require('@/assets/images/anansesem-logo-white.png')}
          className="h-[100px]"
          resizeMode="center"
        />
        <Text className="text-[35px] font-caprasimo text-[#D0EE30]">Anansesem</Text>
      </View> */}

      <Text className="font-caprasimo text-[#D0EE30] text-5xl mb-4">Welcome</Text>
      <Text className="font-poppins text-white text-base text-center mb-8">
        Before letting your child explore Anansesem, take a few minutes to decide on important parental safety controls
      </Text>

      <TouchableOpacity
        onPress={() => router.replace('/(onboarding)/sign-up')}
        className="bg-[#D0EE30] rounded-xl px-6 py-3 w-full"
      >
        <Text className="font-poppinsBold text-[#60178b] text-base text-center">Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(onboarding)/sign-in")}>
        <Text className="text-center text-white text-[12px] font-poppins mt-9 underline">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
