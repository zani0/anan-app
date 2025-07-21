import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function OopsScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center items-center bg-[#60178b] px-6">
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

            {/* Ananse oops image */}
            <Image
                source={require("@/assets/images/oops-illustration.png")}
                className="h-[85px] mb-6"
                resizeMode="contain"
            />

            {/* Title */}
            <Text className="font-caprasimo text-[#D0EE30] text-4xl mb-4">Ananse says oops!</Text>

            {/* Subtitle */}
            <Text className="text-white text-center font-poppins text-base mb-12">
                Ask your parent to set up an account for you.
            </Text>

            {/* Okay Button */}
            <View className="w-full px-6">
                <TouchableOpacity
                    onPress={() => router.push("/")}
                    className="bg-[#D0EE30] py-3 rounded-xl"
                >
                    <Text className="text-[#60178b] text-center font-poppinsBold">Okay</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity className="mt-20">
                <Text className="text-white font-poppins underline underline-offset-[5px]">
                    Learn more about Anansesem accounts
                </Text>
            </TouchableOpacity>
        </View>
    );
}
