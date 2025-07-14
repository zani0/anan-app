import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';

const ACTIVE_BG = '#4B8B3B'; // dark green

const TabIcon = ({ focused, label, icon }: { focused: boolean; label: string; icon: any }) => (
  <View
    className={`items-center justify-center rounded-full px-3 py-2 ${
      focused ? 'bg-[#4B8B3B]' : ''
    }`}
    style={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 60,
    }}
  >
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? '#ffffff' : '#5d198a',
        marginBottom: focused ? 4 : 0,
      }}
      resizeMode="contain"
    />
    <Text
      style={{
        color: focused ? '#ffffff' : 'transparent',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        height: 16,
        lineHeight: 16,
      }}
    >
      {label}
    </Text>
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
          backgroundColor: 'rgba(207, 238, 48, 0.9)',
          borderTopWidth: 0,
          borderRadius: 60,
          marginHorizontal: 16,
          marginBottom: 10,
          height: 70,
          elevation: 10,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home" icon={require('@/assets/icons/home.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Library" icon={require('@/assets/icons/library.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Stats" icon={require('@/assets/icons/stats.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Settings" icon={require('@/assets/icons/settings.png')} />
          ),
        }}
      />
    </Tabs>
  );
}
