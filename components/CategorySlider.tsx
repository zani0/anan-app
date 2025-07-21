import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

const categories = [
  {
    id: "1",
    name: "Recommended",
    icon: require("@/assets/images/icon-recommended.png"),
  },
  { id: "2", name: "Watch", icon: require("@/assets/images/icon-watch.png") },
  { id: "3", name: "Music", icon: require("@/assets/images/icon-music.png") },
  { id: "4", name: "Compete", icon: require("@/assets/images/icon-compete.png") },
  { id: "5", name: "Create", icon: require("@/assets/images/icon-create.png") },
];

export default function CategoryGrid() {
  return (
    <View className="my-6 px-4">
      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="items-center w-[30%]">
            <Image
              source={item.icon}
              className="w-[50px] h-[50px] mb-1"
              resizeMode="contain"
            />
            <Text className="text-[14px] font-medium text-purple-700 text-center">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
