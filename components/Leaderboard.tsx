import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const tabs = ["Global", "Ghana", "7 Days", "30 Days"];

export default function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState("Global");

  return (
    <View className="my-4">
      {/* Title and Filter Tabs */}
      <View className="flex-row justify-between items-center px-2">
        {/* Left: Leaderboard Title */}
        <View className="bg-[#60178b] px-4 py-2 rounded-l-[40px] rounded-tr-[40px] rounded-br-0 w-[50%]">
          <Text className="text-white text-base font-poppinsBold">
            Leaderboard
          </Text>
        </View>

        {/* Right: Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          className="flex-row px-2"
        >
          {tabs.map((tab) => {
            const isActive = selectedTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-full border ${
                  isActive
                    ? "bg-purple-700 border-purple-700"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm font-poppins ${
                    isActive ? "text-white" : "text-gray-800"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Leaderboard Content Placeholder */}
      <View className="mt-4 px-2">
        <Text className="text-gray-500 font-poppins text-sm">
          Showing: {selectedTab}
        </Text>

        {/* Example entries */}
        <View className="mt-2 space-y-3">
          <View className="flex-row justify-between bg-gray-100 p-3 rounded-xl">
            <Text className="font-poppinsBold text-gray-700">1. Zoe Ijeh</Text>
            <Text className="font-poppins text-purple-700">345 pts</Text>
          </View>
          <View className="flex-row justify-between bg-gray-100 p-3 rounded-xl">
            <Text className="font-poppinsBold text-gray-700">2. Ada Kofi</Text>
            <Text className="font-poppins text-purple-700">310 pts</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
