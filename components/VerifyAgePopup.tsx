import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function VerifyAgePopup({ visible, onClose }: Props) {
  const router = useRouter();
  const [yearDigits, setYearDigits] = useState(["", "", "", ""]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const hiddenInputRef = useRef<TextInput>(null);

  const handleInput = (text: string) => {
    if (!/^\d*$/.test(text)) return;

    const newDigits = [...yearDigits];
    if (text === "") {
      newDigits[activeIndex] = "";
      setYearDigits(newDigits);
      return;
    }

    newDigits[activeIndex] = text;
    setYearDigits(newDigits);

    if (activeIndex < 3) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleSubmit = async () => {
    const birthYear = parseInt(yearDigits.join(""));
    const currentYear = new Date().getFullYear();

    if (isNaN(birthYear) || yearDigits.includes("")) {
      setModalMessage("Please enter your full 4-digit birth year.");
      setModalVisible(true);
      return;
    }

    const age = currentYear - birthYear;

    if (age >= 18) {
      setModalMessage("Age verified!");
      setModalVisible(true);

      setTimeout(async () => {
        setModalVisible(false);
        onClose();
        await SecureStore.deleteItemAsync("age_verify_source");
        await SecureStore.deleteItemAsync("token");
        router.replace("/(onboarding)/sign-in");
      }, 1500);
    } else {
      setModalMessage("Oops, you must be at least 18 to continue.");
      setModalVisible(true);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback
        onPress={() => hiddenInputRef.current?.focus()}
      >
        <View className="flex-1 items-center justify-center bg-black/70 px-6">
          <View className="bg-[#5d198a] rounded-2xl px-6 py-8 items-center w-full max-w-[360px] relative">
            {/* Title */}
            <Text className="font-caprasimo text-[#D0EE30] text-2xl mb-2 text-center">
              Enter your birth year to proceed
            </Text>

            {/* Subtitle */}
            {/* <Text className="font-poppins text-white text-sm text-center mb-6">
              We won’t store your age — it's just a quick check!
            </Text> */}

            {/* Year Inputs */}
            <View className="flex-row justify-center mb-6">
              {yearDigits.map((digit, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setActiveIndex(index);
                    hiddenInputRef.current?.focus();
                  }}
                  className={`w-10 h-10 mx-1 rounded-md border items-center justify-center ${
                    activeIndex === index
                      ? "border-[#D0EE30] bg-white/20"
                      : "border-white bg-white/10"
                  }`}
                >
                  <Text className="text-white text-lg font-poppinsBold">
                    {digit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Hidden Input */}
            <TextInput
              ref={hiddenInputRef}
              value={yearDigits[activeIndex]}
              onChangeText={handleInput}
              keyboardType="numeric"
              maxLength={1}
              style={{ position: "absolute", opacity: 0 }}
            />

            {/* Proceed Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#D0EE30] rounded-xl px-5 py-2 w-full"
            >
              <Text className="text-[#5d198a] text-center font-semibold font-poppinsBold">
                Proceed
              </Text>
            </TouchableOpacity>

            {/* Close button */}
            <Pressable className="absolute top-2 right-2" onPress={onClose}>
              <Text className="text-white text-xl">×</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Message Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/60 px-8">
          <View className="bg-white p-6 rounded-xl items-center w-full max-w-[320px]">
            <Text className="text-[#5d198a] font-poppinsBold text-base text-center mb-4">
              {modalMessage}
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              className="mt-2 px-6 py-2 bg-[#5d198a] rounded-full"
            >
              <Text className="text-white font-poppins">OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}
