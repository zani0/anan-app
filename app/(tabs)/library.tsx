import Header from "@/components/Header";
import Library from "@/components/Library";
import SearchBar from "@/components/Search";
import { useRouter } from "expo-router";
import { Flag, Heart } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();


  const renderHeader = () => (
    <View
      style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 0,
        marginBottom: 10,
        backgroundColor: "white",
      }}
      className="px-4"
    >
      <Header />
      <SearchBar />
      <View className="my-2"></View>
    </View>
  );

  return (
    <Library />
  );
}
