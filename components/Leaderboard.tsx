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
    label: "1st",
    thumbnail: require("@/assets/images/gold-crown.png"),
  },
  {
    id: 2,
    label: "2nd",
    thumbnail: require("@/assets/images/silver-crown.png"),
  },
  {
    id: 3,
    label: "3rd",
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
  { name: "You", score: 685 },
  { name: "Fatima", score: 95 },
  { name: "Zuri", score: 160 },
  { name: "Ama", score: 70 },
  { name: "James", score: 80 },
  { name: "Lisa", score: 40 },
  { name: "Amanda", score: 280 },
  { name: "Joshua", score: 330 },
];

export default function Leaderboard() {
  const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
  const userIndex = sortedData.findIndex((item) => item.name === "You");

  const getCrown = (index: number) => crownImages[index]?.thumbnail || null;
  const getLabel = (index: number) =>
    crownImages[index]?.label || `${index + 1}th`;

  const userCrown = getCrown(userIndex);
  const userRankLabel = getLabel(userIndex);

  return (
    <View className="my-4">
      {/* Top Stats */}
      <View className="flex-row justify-between mb-4">
        {/* Left box */}
        <View className="bg-[#d0ed32] items-center justify-center p-3 rounded-xl w-[48%] h-[170px]">
          <Image
            source={avatarImage.thumbnail}
            className="mb-4 w-[80px] h-[80px]"
            resizeMode="contain"
          />
          <View className="items-center">
            <Text className="font-poppinsBold text-[#60178b] text-[28px]">
              {sortedData[userIndex]?.score}
            </Text>
            <Text className="font-poppinsBold text-[#60178b] text-[13px]">points</Text>
          </View>
        </View>

        {/* Right box */}
        <View className="bg-[#d0ed32] items-center justify-center rounded-xl w-[48%] border border-gray-200 px-3">
          {userCrown && (
            <Image
              source={userCrown}
              className="w-[60px] h-[60px]"
              resizeMode="contain"
            />
          )}
          <View className="bg-white px-4 py-2 mt-2 rounded-lg w-full">
            <Text className="ml-2 font-poppinsBold text-[#5D1889] text-[14px] text-center">
              You are
            </Text>
          </View>
          <View className="bg-white px-4 py-2 mt-1 rounded-lg w-full">
            <Text className="ml-2 font-poppinsBold text-[#5D1889] text-[24px] text-center">
              {userRankLabel}
            </Text>
          </View>
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


  crownSmall: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
