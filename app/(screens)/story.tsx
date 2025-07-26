import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import { ChevronLeft, Heart, Share2 } from 'lucide-react-native';

export default function Story() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); 

  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="relative  flex-row items-center justify-center mb-6 mt-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-0 bg-white rounded-full p-2"
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-center text-lg font-poppinsBold">Detail</Text>
      </View>

      <View className="w-full h-48 mt-4 rounded-2xl overflow-hidden">
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1631582053308-40f482e7ace5?q=80&w=1631&auto=format&fit=crop' }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <Text className="text-xl font-poppinsBold text-left mt-4 text-purple-800">
        Why antelope lives in the bush
      </Text>

      <View className="flex-row justify-start gap-4 my-4">
        <TouchableOpacity className="flex-row items-center space-x-2 bg-gray-200 rounded-full px-4 py-2">
          <Heart size={20} color="#555" />
          <Text className="text-gray-700 font-poppins">Like</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-2 bg-gray-200 rounded-full px-4 py-2">
          <Share2 size={20} color="#555" />
          <Text className="text-gray-700 font-poppins">Share</Text>
        </TouchableOpacity>
      </View>

      {/* ⬅️ Make this clickable */}
      <TouchableOpacity onPress={() => router.push('/full-story')}>
        <View className="bg-teal-500 p-4 rounded-xl">
          <Text className="text-white font-poppinsBold mb-2">
            Read Story <Text className="text-xs font-poppins">in original</Text>
          </Text>
          <Text className="text-white text-sm font-poppins leading-relaxed">
            Why Antelope Lives in the Bush? In an ancient community, goat and antelope once shared a home with an owner.
            While they were being tamed, they were told not to tamper with their owner's food supply. Goat and antelope were he...
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row justify-center items-center mt-6">
        <View className="w-2 h-2 bg-purple-700 rounded-full mx-1" />
        <View className="w-2 h-2 bg-gray-300 rounded-full mx-1" />
        <View className="w-2 h-2 bg-gray-300 rounded-full mx-1" />
      </View>

      <TouchableOpacity className="bg-purple-700 mt-6 py-4 rounded-full items-center absolute bottom-4 left-4 right-4">
        <Text className="text-white font-poppinsBold text-lg">Take quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
