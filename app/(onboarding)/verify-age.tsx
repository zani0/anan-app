import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

export default function VerifyAge() {
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

    const handleSubmit = () => {
        const birthYear = parseInt(yearDigits.join(""));
        const currentYear = new Date().getFullYear();

        if (isNaN(birthYear) || yearDigits.includes("")) {
            setModalMessage("Please enter your full 4-digit birth year.");
            setModalVisible(true);
            return;
        }

        const age = currentYear - birthYear;

        if (age >= 18) {
            setModalMessage("Age verified! Welcome to Anansesem.");
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                router.replace("/welcome");
            }, 1500);
        } else {
            router.replace("/(onboarding)/oops");
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-[#5d198a] px-6">

            {/* Top Right Spiderweb */}
            <Image
                source={require('@/assets/images/spider-web-1.png')}
                className="w-[150px] h-[120px] absolute top-[-20] right-[-30]"
                resizeMode="cover"
            />

            {/* Bottom Left Spiderweb */}
            <Image
                source={require('@/assets/images/spider-web-2.png')}
                className="w-[170px] h-[80px] absolute bottom-0 left-0"
                resizeMode="cover"
            />

            {/* Title */}
            <Text className="font-poppins text-[#D0EE30] text-4xl mb-4 text-center">Please enter your birth year to proceed</Text>


            {/* Subtitle */}
            <Text className="font-poppins text-white text-[13px] text-center mb-8">
                This is only a verification method, we won't store your age
            </Text>

            {/* Touchable Box Container */}
            <TouchableWithoutFeedback onPress={() => hiddenInputRef.current?.focus()}>
                <View className="flex-row justify-center mb-8">
                    {yearDigits.map((digit, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setActiveIndex(index);
                                hiddenInputRef.current?.focus();
                            }}
                            className={`w-12 h-12 mx-2 rounded-md border items-center justify-center ${activeIndex === index
                                ? "border-[#D0EE30] bg-white/20"
                                : "border-white bg-white/10"
                                }`}
                        >
                            <Text className="text-white text-xl font-poppinsBold">
                                {digit}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableWithoutFeedback>

            {/* Hidden Input Field */}
            <TextInput
                ref={hiddenInputRef}
                value={yearDigits[activeIndex]}
                onChangeText={handleInput}
                keyboardType="numeric"
                maxLength={1}
                style={{
                    position: "absolute",
                    opacity: 0,
                }}
            />

            {/* Proceed Button */}
            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#D0EE30] rounded-xl px-6 py-3 w-full"
            >
                <Text className="text-[#5d198a] text-center font-semibold font-poppinsBold">
                    Proceed
                </Text>
            </TouchableOpacity>

            {/* Custom Modal */}
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
        </View>
    );
}
