import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function ParentalConsent() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-[#60178b] px-6 relative">
      {/* Top Right Spiderweb */}
      <Image
        source={require("@/assets/images/spider-web-1.png")}
        className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
        resizeMode="cover"
      />

      {/* Bottom Left Spiderweb */}
      <Image
        source={require("@/assets/images/spider-web-2.png")}
        className="w-[170px] h-[80px] absolute bottom-0 left-0"
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-[35px] font-caprasimo text-[#D0EE30] text-center mb-4">
          About Anansesem Accounts
        </Text>

        {/* Consent Text */}
        <View className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <Text className="uppercase font-poppins text-[17px] mb-5">
            Parents
          </Text>
          <Text className="font-poppins text-gray-800 text-base text-left mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
            fugiat ipsam itaque ipsum cupiditate, mollitia ex perferendis
            delectus, ullam hic excepturi dolores voluptatibus eveniet quos
            quibusdam? Totam doloremque repellendus corporis!
          </Text>
          <Text className="uppercase font-poppins text-[17px] mb-5">
            Children
          </Text>
          <Text className="font-poppins text-gray-800 text-base text-left">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis,
            ratione reprehenderit culpa saepe eaque, laboriosam veniam nostrum
            tenetur nam vero ex cumque nisi nulla maxime illum! Praesentium
            maiores veritatis voluptatibus?
          </Text>
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 bg-[#D0EE30] rounded-xl py-3 items-center"
          >
            <Text className="text-[#60178b] font-poppinsBold">Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
}
