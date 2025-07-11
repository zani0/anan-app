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
            <Text className="text-[#5d198a] text-[18px] font-poppins text-center mb-6">
              What’s your child’s name?
            </Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Name here"
              placeholderTextColor="#aaa"
              className="text-center font-poppins text-gray-800 px-4 py-2 mb-2"
              style={{
                borderBottomWidth: 1.5,
                borderColor: "#5d198a",
                borderStyle: "dotted",
              }}
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
            <View className="flex-row flex-wrap justify-between gap-4">
              {ageGroups.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => handleChange("age", item.value)}
                  className={`w-[30%] bg-white rounded-xl p-2 items-center ${
                    form.age === item.value
                      ? "border-4 border-[#D0EE30]"
                      : "border-2 border-transparent"
                  }`}
                >
                  <Image
                    source={item.image}
                    className="w-14 h-14 mb-2"
                    resizeMode="contain"
                  />
                  <Text className="text-sm font-poppinsBold text-[#5d198a] text-center">
                    {item.label}
                  </Text>
                  <Text className="text-xs text-gray-500 text-center">
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-white font-poppins text-lg text-center mb-6">
              What’s your child’s gender?
            </Text>
            <View className="flex-row justify-between gap-4">
              <TouchableOpacity
                className={`flex-1 bg-white rounded-xl py-3 items-center ${
                  form.gender === "boy" ? "border-4 border-[#D0EE30]" : ""
                }`}
                onPress={() => handleChange("gender", "boy")}
              >
                <Text className="font-poppins text-black">Boy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 bg-white rounded-xl py-3 items-center ${
                  form.gender === "girl" ? "border-4 border-[#D0EE30]" : ""
                }`}
                onPress={() => handleChange("gender", "girl")}
              >
                <Text className="font-poppins text-black">Girl</Text>
              </TouchableOpacity>
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
        <Text className="text-[30px] font-poppins text-[#D0EE30] text-center mb-3">
          Create a profile for your child
        </Text>

        <Text className="font-poppins text-white text-center text-base mb-8">
          We only use this to curate the kind of videos suitable for your child
        </Text>

        {/* Card */}
        <View className="bg-white p-6 rounded-2xl space-y-4">
          {renderStep()}

          {/* Next Button */}
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
