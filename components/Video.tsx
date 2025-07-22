import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Star } from "lucide-react-native";

export default function Video() {
  const [playVideo, setPlayVideo] = useState(false);
  const [rating, setRating] = useState(0);

  const renderStars = () => {
    return (
      <View className="flex-row mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            className="mx-1"
          >
            <Star
              size={24}
              color={star <= rating ? "#facc15" : "#e5e7eb"} // yellow-400 or gray-200
              fill={star <= rating ? "#facc15" : "none"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View className="w-full">
      {!playVideo ? (
        <TouchableOpacity
          onPress={() => setPlayVideo(true)}
          className="rounded-2xl overflow-hidden my-2"
        >
          {/* Thumbnail */}
          <View className="relative w-full h-56">
            <Image
              source={require("@/assets/images/cartoon.jpg")}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 items-center justify-center">
              <View className="w-12 h-12 bg-lime-300 rounded-full items-center justify-center">
                <Text className="text-black font-bold text-xl">▶</Text>
              </View>
              <Text className="text-white mt-2 font-medium font-poppins">
                Play Video
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <YoutubePlayer
          height={220}
          play={true}
          videoId={"XqZsoesa55w"}
          initialPlayerParams={{
            controls: 2,
            modestbranding: true,
            rel: false,
            showinfo: false,
          }}
        />
      )}

      {/* Text & Rating Section */}
      <View className="w-full px-4 py-3">
        <Text className="text-purple-900 font-poppinsBold text-[23px]">
          The three village hunters
        </Text>
        <Text className="text-purple-900 text-md font-poppins">
          Story by Nutifafa Tsikata
        </Text>

        {/* Star Rating */}
        <View className="mt-2">{renderStars()}</View>
      </View>
    </View>
  );
}
