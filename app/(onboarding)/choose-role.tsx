import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "react-native";

export default function ChooseRole() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#5d198a] p-4">
      <Image
        source={require('@/assets/images/anansesem-logo.png')}
        className="w-[200px] h-[200px] mb-6"
        resizeMode="contain"
      />
      <Text>Anansesem</Text>
      <Text className="text-md mb-4 text-white font-poppins text-center">Only parents can set up an Anansesem account</Text>

      <TouchableOpacity
        onPress={() => router.push("/(onboarding)/verify-age")}
        className="bg-[#D0EE30] rounded-xl px-6 py-3 w-full mb-4"
      >
        <Text className="text-[#5d198a] text-center font-semibold font-poppins">I am a PARENT</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)")}
        className="bg-[#D0EE30] rounded-xl px-6 py-3 w-full"
      >
        <Text className="text-[#5d198a] text-center font-semibold font-poppins">I am a KID</Text>
      </TouchableOpacity>


      <TouchableOpacity className="mt-20">
        <Text className="text-white font-poppins underline underline-offset-[5px]">Learn more about Anansesem accounts</Text>
      </TouchableOpacity>
    </View>
  );
}
