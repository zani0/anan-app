import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function ChooseRole() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#5d198a] relative">
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

      {/* Main Content */}
      <View className="flex-1 items-center justify-center p-4">
        <View className="items-center mb-20">
          <Image
            source={require('@/assets/images/anansesem-logo-white.png')}
            className="h-[100px]"
            resizeMode="center"
          />
          <Text className="text-[35px] font-caprasimo text-[#D0EE30]">Anansesem</Text>
        </View>

        <Text className="text-[14px] text-balance w-[24rem] mb-12 text-white font-poppins text-center">
          Only parents can set up an Anansesem account
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(onboarding)/verify-age")}
          className="bg-[#D0EE30] rounded-xl px-6 py-3 w-full mb-4"
        >
          <Text className="text-[#5d198a] text-center font-semibold font-poppinsBold">I am a PARENT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(onboarding)/oops")}
          className="bg-[#D0EE30] rounded-xl px-6 py-3 w-full"
        >
          <Text className="text-[#5d198a] text-center font-semibold font-poppinsBold">I am a KID</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-20">
          <Text className="text-white font-poppins underline underline-offset-[5px]">
            Learn more about Anansesem accounts
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
