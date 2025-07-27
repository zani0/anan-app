import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const crownImages = [
  {
    id: 1,
    label: "first",
    thumbnail: require("@/assets/images/gold-crown.png"),
  },
  {
    id: 2,
    label: "second",
    thumbnail: require("@/assets/images/silver-crown.png"),
  },
  {
    id: 3,
    label: "third",
    thumbnail: require("@/assets/images/bronze-crown.png"),
  },
];

const avatarImage = {
  id: "avatar",
  thumbnail: require("../assets/images/avatar-child.png"),
};

const leaderboardData = [
  { name: "Ada", score: 120 },
  { name: "Kwame", score: 110 },
  { name: "You", score: 155 },
  { name: "Fatima", score: 95 },
  { name: "John", score: 80 },
];

export default function Leaderboard() {
  const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
  const userIndex = sortedData.findIndex((item) => item.name === "You");

  const getCrown = (index: number) => crownImages[index]?.thumbnail || null;
  const getLabel = (index: number) => crownImages[index]?.label || `${index + 1}th`;

  const userCrown = getCrown(userIndex);
  const userRankLabel = getLabel(userIndex);

  return (
    <View className="my-4 px-4">
      {/* Top Stats */}
      <View className="flex-row justify-between mb-4">
        {/* Left box */}
        <View className="bg-[#d0ed32] items-center p-3 rounded-xl w-[48%] h-[90px]">
          <Image source={avatarImage.thumbnail} style={styles.avatar} className="mb-4" />
          <Text className="ml-3 font-poppinsBold text-[#60178b] text-sm">
            You have {sortedData[userIndex]?.score} points
          </Text>
        </View>

        {/* Right box */}
        <View className="bg-[#d0ed32] items-center justify-center p-3 rounded-xl w-[48%] border border-gray-200">
          {userCrown && <Image source={userCrown} style={styles.crown} className="w-[80px] h-[80px]" resizeMode="cover" />}
          <Text className="ml-2 font-poppinsBold text-[#5D1889] text-sm">
            You are {userRankLabel}
          </Text>
        </View>
      </View>

      {/* Section Header */}
      <View className="mb-4 flex-row justify-between items-center">
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[35vw] mr-4">
          <Text className="text-white text-base font-poppinsBold">
            Your points
          </Text>
        </View>

        <View className="flex-row gap-2">
          {["Global", "Ghana", "7 Days", "30 Days"].map((tab, index) => (
            <TouchableOpacity
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full border border-gray-300"
            >
              <Text className="text-xs font-poppins">{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Leaderboard List */}
      <ScrollView>
        {sortedData.map((item, index) => {
          const isCurrentUser = item.name === "You";
          const crown = getCrown(index);

          return (
            <View
              key={index}
              className={`flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 ${
                isCurrentUser ? "bg-[#d0ed32]" : "bg-[#5D1889]"
              }`}
            >
              <View className="flex-row items-center gap-2">
                {crown && <Image source={crown} style={styles.crownSmall} />}
                <Text
                  className={`font-poppinsBold text-sm ${
                    isCurrentUser ? "text-black" : "text-white"
                  }`}
                >
                  {index + 1}. {item.name}
                </Text>
              </View>
              <Text
                className={`font-poppins text-sm ${
                  isCurrentUser ? "text-black" : "text-white"
                }`}
              >
                {item.score} Points
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 20,
  },
  crown: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  crownSmall: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
