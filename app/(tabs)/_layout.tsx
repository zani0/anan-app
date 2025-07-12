import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';

const TabIcon = ({ focused, label, icon }: { focused: boolean; label: string; icon: any }) => (
  <View className="flex-row items-center justify-center space-x-1">
    <Image
      source={icon}
      style={{ width: 24, height: 24, tintColor: focused ? '#ffffff' : '#5d198a' }}
      resizeMode="contain"
    />
    {focused && <Text className="text-white font-poppins text-sm">{label}</Text>}
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#5d198a',
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(207, 238, 48, 0.9)', // Slightly transparent lime
          borderTopWidth: 0,
          borderRadius: 60,
          marginHorizontal: 16,
          marginBottom: 10,
          height: 70,
          // shadowColor: '#000',
          // shadowOffset: { width: 0, height: 4 },
          // shadowOpacity: 0.1,
          // shadowRadius: 6,
          elevation: 10,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          display: 'none', // We'll show it manually when focused
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Home"
              icon={require('@/assets/icons/home.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Library"
              icon={require('@/assets/icons/library.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Stats"
              icon={require('@/assets/icons/stats.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Settings"
              icon={require('@/assets/icons/settings.png')}
            />
          ),
        }}
      />
    </Tabs>
  );
}
