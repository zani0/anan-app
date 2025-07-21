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
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#5a1786"; 
const SECONDARY_COLOR = "#d0ed32"; 

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
  const orderedRoutes = ["index", "library", "stats", "settings"];
  const sortedRoutes = [...state.routes].sort(
    (a, b) => orderedRoutes.indexOf(a.name) - orderedRoutes.indexOf(b.name)
  );

  return (
    <View style={styles.container}>
      {sortedRoutes.map((route, index) => {
        const isFocused = state.index === state.routes.indexOf(route);
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
            <AnimatedIcon name={route.name} focused={isFocused} />

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

const AnimatedIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const scale = useSharedValue(focused ? 1.2 : 1);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1);
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const size = 26;
  let IconComponent;

  switch (name) {
    case "index":
      IconComponent = <Feather name="home" size={size} color="#5a1786" />;
      break;
    case "library":
      IconComponent = <Ionicons name="library-outline" size={size} color="#5a1786" />;
      break;
    case "stats":
      IconComponent = <Feather name="bar-chart-2" size={size} color="#5a1786" />;
      break;
    case "settings":
      IconComponent = <Ionicons name="settings-outline" size={size} color="#5a1786" />;
      break;
    default:
      IconComponent = <Feather name="home" size={size} color="#5a1786" />;
  }

  return <Animated.View style={animatedStyle}>{IconComponent}</Animated.View>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "rgba(75, 139, 59, 0.9)", 
    backgroundColor: "#fff", 
    width: "90%",
    alignSelf: "center",
    bottom: Platform.OS === "ios" ? 40 : 30,
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 10,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 13,
  },
});

export default CustomNavBar;
