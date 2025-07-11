import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
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
    // Simple validation
    if (step === 1 && !form.name) {
      Toast.show({ type: "error", text1: "Enter a name 🧒🏾" });
      return;
    }
    if (step === 2 && !form.age) {
      Toast.show({ type: "error", text1: "Enter your child's age 🎂" });
      return;
    }
    if (step === 3 && !form.gender) {
      Toast.show({ type: "error", text1: "Select a gender 🚻" });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      Toast.show({ type: "success", text1: "Profile created!", text2: "You're all set 🎉" });
      // navigate or save form data here
      setTimeout(() => router.replace("/welcome"), 1500);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text className="text-white font-poppins text-lg mb-3">What’s your child’s name?</Text>
            <TextInput
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Child’s name"
              placeholderTextColor="#aaa"
              className="bg-white rounded-xl px-4 py-3 font-poppins text-black"
            />
          </>
        );
      case 2:
        return (
          <>
            <Text className="text-white font-poppins text-lg mb-3">How old is your child?</Text>
            <TextInput
              value={form.age}
              onChangeText={(text) => handleChange("age", text)}
              placeholder="Child’s age"
              keyboardType="numeric"
              placeholderTextColor="#aaa"
              className="bg-white rounded-xl px-4 py-3 font-poppins text-black"
            />
          </>
        );
      case 3:
        return (
          <>
            <Text className="text-white font-poppins text-lg mb-3">What’s your child’s gender?</Text>
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
    <View className="flex-1 bg-[#5d198a] px-6 justify-center">
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
        <Text className="text-[35px] font-poppins text-[#D0EE30] text-center mb-4">
          Create a Profile
        </Text>

        <View className="bg-white/10 p-6 rounded-2xl">
          {renderStep()}

          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#D0EE30] py-3 mt-8 rounded-xl"
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
