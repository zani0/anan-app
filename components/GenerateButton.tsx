import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Sparkles } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FloatingButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/generate-story")}
      activeOpacity={0.9}
      style={styles.buttonContainer}
    >
      <LinearGradient
        colors={["#5a1786", "#ae2c44"]}
        start={{ x: 4, y: 3 }}
        end={{ x: 8, y: 2 }}
        style={styles.gradient}
      >
        <Sparkles color="#fff" size={20} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 120,
    right: 20,
    zIndex: 999,
    borderRadius: 999,
    overflow: "hidden",
  },
  gradient: {
    padding: 20,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
