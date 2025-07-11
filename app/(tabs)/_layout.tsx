import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const tabs = [
  { name: 'index', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'library', label: 'Library', icon: 'book-outline', activeIcon: 'book' },
  { name: 'stats', label: 'Stats', icon: 'stats-chart-outline', activeIcon: 'stats-chart' },
  { name: 'settings', label: 'Settings', icon: 'settings-outline', activeIcon: 'settings' },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{ title: tab.label }}
        />
      ))}
    </Tabs>
  );
}

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View className="flex-row justify-around items-center bg-white h-[60px] px-2">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title;
        const isFocused = state.index === index;

        const tab = tabs.find((t) => t.name === route.name);
        const iconName = isFocused ? tab?.activeIcon : tab?.icon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-row items-center space-x-2 px-3 py-2 rounded-xl"
          >
            <Ionicons
              name={iconName as any}
              size={24}
              color={isFocused ? '#5d198a' : '#999'}
            />
            {isFocused && (
              <Text className="text-[#5d198a] font-poppins text-sm">
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
