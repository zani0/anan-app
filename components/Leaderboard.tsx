import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const leaderboardData = [
  { name: "Ada", score: 120 },
  { name: "Kwame", score: 110 },
  { name: "You", score: 105 }, // current user
  { name: "Fatima", score: 95 },
  { name: "John", score: 80 },
];

export default function Leaderboard() {
  return (
    <View className="my-4">
      {/* Section Header */}
      <View className="mb-4 flex-row justify-between items-center">
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[40vw]">
          <Text className="text-white text-base font-poppinsBold">
            Your points
          </Text>
        </View>

        {/* Tabs */}
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
        {leaderboardData.map((item, index) => {
          const isCurrentUser = item.name === "You";

          return (
            <View
              key={index}
              className={`flex-row justify-between items-center rounded-xl px-4 py-3 mb-2 ${
                isCurrentUser ? "bg-green-600" : "bg-[#5a1786]"
              }`}
            >
              <Text className="text-white font-poppinsBold text-sm">
                {index + 1}. {item.name}
              </Text>
              <Text className="text-white font-poppins text-sm">
                {item.score} pts
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}