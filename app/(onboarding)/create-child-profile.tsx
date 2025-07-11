import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function CreateChildProfile() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !form.name) {
      Toast.show({ type: "error", text1: "Enter a name 🧒🏾" });
      return;
    }
    if (step === 2 && !form.age) {
      Toast.show({ type: "error", text1: "Select an age group 🎂" });
      return;
    }
    if (step === 3 && !form.gender) {
      Toast.show({ type: "error", text1: "Select a gender 🚻" });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      Toast.show({
        type: "success",
        text1: "Profile created!",
        text2: "You're all set 🎉",
      });
      setTimeout(() => router.replace("/welcome"), 1500);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text className="text-[#5d198a] text-[18px] font-poppins text-center mb-3">
              What’s your child’s name?
            </Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Name here"
              placeholderTextColor="#aaa"
              className="bg-transparent border-b border-dotted border-[#5d198a] px-4 py-3 font-poppins text-white text-center w-full mb-2"
            />
          </>
        );

      case 2:
        const ageGroups = [
          {
            label: "Pre-school",
            value: "preschool",
            description: "Age 4 and under",
            image: require("@/assets/images/oops-illustration.png"),
          },
          {
            label: "Younger",
            value: "younger",
            description: "Ages 5-8",
            image: require("@/assets/images/oops-illustration.png"),
          },
          {
            label: "Older",
            value: "older",
            description: "Ages 9-12",
            image: require("@/assets/images/oops-illustration.png"),
          },
        ];

        return (
          <>
            <Text className="text-white font-poppins text-lg text-center mb-6">
              How old is your child?
            </Text>
            <View className="space-y-4">
              {ageGroups.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => handleChange("age", item.value)}
                  className={`flex-row items-center bg-white rounded-xl p-4 mb-4 ${
                    form.age === item.value
                      ? "border-4 border-[#D0EE30]"
                      : "border border-transparent"
                  }`}
                >
                  <Image
                    source={item.image}
                    className="w-14 h-14 mr-4"
                    resizeMode="contain"
                  />
                  <View>
                    <Text className="text-base font-poppinsBold text-[#5d198a]">
                      {item.label}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );

      case 3:
        const genderOptions = [
          { label: "Boy", value: "boy" },
          { label: "Girl", value: "girl" },
          { label: "I’d rather not say", value: "unspecified" },
        ];

        return (
          <>
            <Text className="text-white font-poppins text-lg text-center mb-6">
              What’s your child’s gender?
            </Text>
            <View className="space-y-4">
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleChange("gender", option.value)}
                  className={`bg-white rounded-xl py-3 px-4 items-center ${
                    form.gender === option.value
                      ? "border-4 border-[#D0EE30]"
                      : "border border-transparent"
                  }`}
                >
                  <Text className="font-poppins text-black">{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-[#5d198a] px-6 justify-center items-center">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Spiderwebs */}
        <Image
          source={require("@/assets/images/spider-web-1.png")}
          className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
        />
        <Image
          source={require("@/assets/images/spider-web-2.png")}
          className="w-[170px] h-[80px] absolute bottom-0 left-0"
        />

        {/* Title */}
        <Text className="text-[30px] font-poppins text-[#D0EE30] text-center mb-4">
          Create a profile for your child
        </Text>

        <Text className="font-poppins text-white text-base text-center mb-8">
          We only use this to curate the kind of videos suitable for your child
        </Text>

        <View className="bg-white/20 p-6 rounded-2xl w-full space-y-4">
          {renderStep()}

          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#D0EE30] py-3 mt-6 rounded-xl"
          >
            <Text className="text-[#5d198a] text-center font-poppinsBold text-[18px]">
              {step < 3 ? "Next" : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
}
