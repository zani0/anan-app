import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function OopsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-[#5d198a] px-6">
      {/* Top Image */}
      <Image
        source={require("@/assets/images/oops-illustration.png")} // replace with your image
        className="w-60 h-60 mb-6"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-[#D0EE30] text-[35px] font-caprasimo mb-2">Oops!</Text>

      {/* Subtitle */}
      <Text className="text-white text-center font-poppins text-base mb-12">
        You're not old enough to use this app.{"\n"}Ask your parent to set up an account for you.
      </Text>

      {/* Okay Button */}
      <View className="w-full px-6 absolute bottom-12">
        <TouchableOpacity
          onPress={() => router.replace("/welcome")}
          className="bg-[#D0EE30] py-3 rounded-xl"
        >
          <Text className="text-[#5d198a] text-center font-poppinsBold">Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
