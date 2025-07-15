import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#4B8B3B"; // Green background
const SECONDARY_COLOR = "#cfee30";  // White tab when active

// ✅ Custom labels for tabs
const routeLabels: Record<string, string> = {
  index: "Home",
  library: "Library",
  stats: "Stats",
  settings: "Settings",
};

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;
        const label = routeLabels[route.name] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              {
                backgroundColor: isFocused ? SECONDARY_COLOR : "transparent",
              },
            ]}
            layout={LinearTransition.springify().mass(0.5)}
          >
            {getIconByRouteName(
              route.name,
              isFocused ? "#fff" : "#fff"
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}
              >
                {label}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
};

function getIconByRouteName(routeName: string, color: string) {
  switch (routeName) {
    case "index":
      return <Feather name="home" size={18} color={color} />; // 🏠 Home
    case "library":
      return <Ionicons name="library-outline" size={18} color={color} />; // 📚 Library
    case "stats":
      return <Feather name="bar-chart-2" size={18} color={color} />; // 📊 Stats
    case "settings":
      return <Ionicons name="settings-outline" size={18} color={color} />; // ⚙️ Settings
    default:
      return <Feather name="home" size={18} color={color} />;
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "90%",
    alignSelf: "center",
    bottom: Platform.OS === "ios" ? 40 : 30,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 15,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.25,
    // shadowRadius: 6,
    elevation: 10,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 30,
  },
  text: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 12,
  },
});

export default CustomNavBar;
