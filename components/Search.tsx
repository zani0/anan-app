import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SearchIcon } from "lucide-react-native";
import { useRouter } from "expo-router";

type Props = {
  isSearchEnabled?: boolean; // made optional
};

export default function SearchBar({ isSearchEnabled = true }: Props) { // default = true
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push({
        pathname: "/search-results",
        params: { query },
      });
    }
    console.log("Search for:", query);
  };

  if (!isSearchEnabled) return null;

  return (
    <View className="px-4 my-4 bg-white">
      <View style={styles.container}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Anansesem"
          placeholderTextColor="#888"
          style={styles.input}
          className="font-poppins"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.buttonContainer}>
          <View style={styles.button}>
            <SearchIcon color="white" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 50,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    width: 80,
    height: "100%",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    backgroundColor: "#60178b",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    transform: [{ scaleX: 1.2 }, { translateX: -10 }],
  },
});
