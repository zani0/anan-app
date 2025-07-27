import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function AccountType() {
  const router = useRouter();
  const [selected, setSelected] = useState<"parent" | "child" | null>(null);

  const handleNext = () => {
    if (!selected) return;
    if (selected === "parent") {
      router.replace("/(tabs)");
    } else {
      router.push("/(onboarding)/create-child-profile");
    }
  };

  const OptionCard = ({
    type,
    title,
    subtitle,
    image,
  }: {
    type: "parent" | "child";
    title: string;
    subtitle: string;
    image: any;
  }) => (
    <TouchableOpacity
      onPress={() => setSelected(type)}
      className={`bg-white rounded-2xl p-4 mb-4 border-4 ${
        selected === type ? "border-[#D0EE30]" : "border-transparent"
      }`}
    >
      <View className="flex-row items-center">
        {/* Image */}
        <Image
          source={image}
          className="w-16 h-16 mr-4 rounded-md"
          resizeMode="contain"
        />

        {/* Text */}
        <View className="flex-1">
          <Text className="text-lg font-poppinsBold text-[#60178b]">
            {title}
          </Text>
          <Text className="text-sm font-poppins text-gray-600">{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#60178b] px-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Title */}
          <Text className="text-[30px] text-[#D0EE30] font-caprasimo text-center mb-2">
            How do you want to proceed?
          </Text>

          {/* Subtitle */}
          <Text className="text-white text-center font-poppins mb-6">
            You can either go ahead with your own profile or create a profile
            for your child.
          </Text>

          {/* Options */}
          <View>
            <OptionCard
              type="parent"
              title="Create one account kid account"
              subtitle="This means you’re creating only one kid account."
              image={require("@/assets/images/girl.png")}
            />
            <OptionCard
              type="child"
              title="Create multiple kid accounts"
              subtitle="accounts for more than one kid."
              image={require("@/assets/images/kids.png")}
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity
            disabled={!selected}
            onPress={handleNext}
            className={`mt-8 py-3 rounded-xl ${
              selected ? "bg-[#D0EE30]" : "bg-[#D0EE30]/50"
            }`}
          >
            <Text className="text-center text-[#60178b] font-poppinsBold text-[18px]">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
