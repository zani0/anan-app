import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
        <Image source={image} className="w-16 h-16 mr-4 rounded-md" />

        {/* Text */}
        <View className="flex-1">
          <Text className="text-lg font-poppinsBold text-[#5d198a]">{title}</Text>
          <Text className="text-sm font-poppins text-gray-600">{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#5d198a] px-6 py-12">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-[30px] text-[#D0EE30] font-poppinsBold text-center mb-2">
          How do you want to proceed?
        </Text>

        {/* Subtitle */}
        <Text className="text-white text-center font-poppins mb-6">
          You can either go ahead with your own profile or create a profile for your child.
        </Text>

        {/* Options */}
        <View>
          <OptionCard
            type="parent"
            title="Use Parent Account"
            subtitle="Continue with your account and manage parental controls."
            image={require("@/assets/images/parent-icon.png")} // Replace with your own image
          />
          <OptionCard
            type="child"
            title="Create Child Profile"
            subtitle="Set up a dedicated account for your child to access content."
            image={require("@/assets/images/child-icon.png")} // Replace with your own image
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
          <Text className="text-center text-[#5d198a] font-poppinsBold text-[18px]">
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
