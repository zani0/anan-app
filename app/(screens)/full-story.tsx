import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, Heart, Share2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import Header from "@/components/HeaderGoBack";

export default function FullStory() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Top Bar */}
      <Header />

      {/* Image */}
      <View className="w-full h-72 mb-4 rounded-2xl overflow-hidden">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1631582053308-40f482e7ace5?q=80&w=1631&auto=format&fit=crop",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Tags */}
      <View className="flex-row gap-2 mb-4 px-4">
        <Text className="bg-cyan-100 text-cyan-800 text-sm font-poppins px-3 py-1 rounded-md">
          ADVENTURE
        </Text>
        <Text className="bg-sky-200 text-sky-800 text-sm font-poppins px-3 py-1 rounded-md uppercase">
          Intermediate
        </Text>
      </View>

      {/* Story Titles */}
      <Text className="text-[20px] font-poppinsBold uppercase text-purple-800 mb-2 px-4">
        Why antelope lives in the bush
      </Text>

      {/* Meta Info */}
      {/* <View className="flex-row items-center flex-wrap gap-2 mb-4">
        <Text className="text-sm font-poppins text-gray-600">
          👤 by Content Manager
        </Text>
        <Text className="text-sm font-poppins text-gray-600">• 1 view</Text>
        <Text className="text-sm font-poppins text-gray-600">• 0 likes</Text>
      </View> */}

      {/* Like & Share */}
      <View className="flex-row gap-4 mb-2 px-4">
        <TouchableOpacity className="flex-row items-center space-x-4 bg-gray-200 rounded-full px-4 py-2">
          <Heart size={20} color="#555" />
          <Text className="text-gray-700 font-poppins ml-2">Like</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity className="flex-row items-center space-x-2 bg-gray-200 rounded-full px-4 py-2">
          <Share2 size={20} color="#555" />
          <Text className="text-gray-700 font-poppins">Share</Text>
        </TouchableOpacity> */}
      </View>

      {/* Full Story Box */}
      <ScrollView className="bg-white p-4 rounded-xl mb-6">
        <Text className="text-black text-sm font-poppins leading-relaxed">
          Why Antelope Lives in the Bush? In an ancient community, goat and
          antelope once shared a home with an owner. While they were being
          tamed, they were told not to tamper with their owner's food supply.
          Goat and antelope were held to a high standard, but curiosity got the
          better of the goat. One day, while the owner was away, goat ate some
          of the food. When the owner returned, only antelope was around, and he
          was blamed. Out of shame, antelope ran away into the wild and has
          lived in the bush ever since. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestias sint atque sequi tenetur. Autem nisi vero
          eius voluptatibus inventore. Consequuntur itaque at saepe eius odit ad
          delectus molestiae magni asperiores. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Eveniet, porro harum. Doloribus suscipit
          ad eaque nobis laudantium quam velit possimus culpa eius, aut nemo
          impedit! At quisquam maiores quo harum. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Ipsa cum quasi facere maiores magni
          corrupti quam quae mollitia magnam eos porro, voluptate possimus,
          minus velit distinctio ex quibusdam laudantium omnis. Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Eum maxime soluta
          repellat ullam impedit, accusamus est praesentium blanditiis, fugiat
          reprehenderit ipsa cumque explicabo perspiciatis ad quia, illo in
          saepe assumenda!
        </Text>
      </ScrollView>
    </ScrollView>
  );
}
