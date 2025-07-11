import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function ParentalConsent() {
    const router = useRouter();

    const handleConsent = (accepted: boolean) => {
        if (accepted) {
            Toast.show({
                type: "success",
                text1: "Consent Accepted",
                text2: "You're all set! 💫",
            });
            setTimeout(() => router.replace("/welcome"), 1500);
        } else {
            Toast.show({
                type: "error",
                text1: "Consent Declined",
                text2: "You won't be able to continue without consent.",
            });
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-[#5d198a] px-6 relative">
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
                <Text className="text-[35px] font-poppins text-[#D0EE30] text-center mb-4">
                    Parental Consent
                </Text>

                {/* Consent Text */}
                <View className="bg-white rounded-2xl p-6 shadow-md mb-6">
                    <Text className="uppercase font-poppins mb-5">Important Parental Notice</Text>
                    <Text className="font-poppins text-gray-800 text-base text-left">
                        By accepting this agreement, you confirm that you are the parent or legal guardian of
                        the child and consent to the creation and use of the Anansesem account for learning,
                        interaction, and content tracking purposes.
                        <br></br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, animi molestias. 
                        <br></br>
                        Numquam veritatis eligendi aspernatur tenetur commodi doloremque odit, molestias, harum in neque maiores, doloribus magnam! Obcaecati dolor voluptas doloribus.
                    </Text>
                </View>

                {/* Buttons */}
                <View className="flex-row justify-between gap-4">
                    <TouchableOpacity
                        onPress={() => handleConsent(false)}
                        className="flex-1 bg-white rounded-xl py-3 items-center"
                    >
                        <Text className="text-[#5d198a] font-poppinsBold">Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleConsent(true)}
                        className="flex-1 bg-[#D0EE30] rounded-xl py-3 items-center"
                    >
                        <Text className="text-[#5d198a] font-poppinsBold">Accept</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Toast />
        </View>
    );
}
