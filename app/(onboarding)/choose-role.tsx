import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ChooseRole() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-xl font-bold mb-4">Who are you?</Text>

      <TouchableOpacity
        // onPress={() => router.push("/(onboarding)/verify-age")}
        className="bg-blue-500 rounded-full px-6 py-3 mb-4"
      >
        <Text className="text-white font-semibold">I'm a Parent</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)")}
        className="bg-green-500 rounded-full px-6 py-3"
      >
        <Text className="text-white font-semibold">I'm a Child</Text>
      </TouchableOpacity>
    </View>
  );
}
