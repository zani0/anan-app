import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';

const ACTIVE_BG = '#4B8B3B'; // dark green

const TabIcon = ({
  focused,
  label,
  icon,
}: {
  focused: boolean;
  label: string;
  icon: any;
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 30,
        backgroundColor: focused ? ACTIVE_BG : 'transparent',
      }}
    >
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? '#fff' : '#5d198a',
          marginBottom: focused ? 2 : 0,
        }}
        resizeMode="contain"
      />
      {focused && (
        <Text
          style={{
            color: '#fff',
            fontSize: 11,
            marginTop: 2,
            fontFamily: 'Poppins-Medium',
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

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
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          display: 'none',
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
