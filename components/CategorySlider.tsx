import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

export default function CategorySlider() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const scrollAmount = 100; // Adjust as needed

  const scrollLeft = () => {
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollTo({ x: scrollAmount * 2, animated: true });
  };

  return (
    <View className="my-4 px-0 flex-row items-center">
      {/* Left Arrow */}
      <TouchableOpacity onPress={scrollLeft} className="mr-2">
        <ChevronLeft size={24} color="#5a1786" />
      </TouchableOpacity>

      {/* Scrollable Categories */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        <TouchableOpacity
          className="items-center w-[60px]"
          onPress={() => router.push("/recommended")}
        >
          <Image
            source={require("@/assets/images/icon-recommended.png")}
            className="w-[50px] h-[50px] mb-1"
            resizeMode="contain"
          />
          <Text
            className="text-[10px] font-poppinsBold text-[#5a1786] text-center"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Recommended
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-[60px]"
          onPress={() => router.push("/watch")}
        >
          <Image
            source={require("@/assets/images/icon-watch.png")}
            className="w-[50px] h-[50px] mb-1"
            resizeMode="contain"
          />
          <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
            Watch
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-[60px]"
          onPress={() => router.push("/music")}
        >
          <Image
            source={require("@/assets/images/icon-music.png")}
            className="w-[50px] h-[50px] mb-1"
            resizeMode="contain"
          />
          <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
            Music
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-[60px]"
          onPress={() => router.push("/compete")}
        >
          <Image
            source={require("@/assets/images/icon-compete.png")}
            className="w-[50px] h-[50px] mb-1"
            resizeMode="contain"
          />
          <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
            Compete
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-[60px]"
          onPress={() => router.push("/generate-story")}
        >
          <Image
            source={require("@/assets/images/icon-create.png")}
            className="w-[50px] h-[50px] mb-1"
            resizeMode="contain"
          />
          <Text className="text-[10px] font-poppinsBold text-[#5a1786] text-center">
            Create
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Right Arrow */}
      <TouchableOpacity onPress={scrollRight} className="ml-2">
        <ChevronRight size={24} color="#5a1786" />
      </TouchableOpacity>
    </View>
  );
}
