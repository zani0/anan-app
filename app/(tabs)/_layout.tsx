import React from 'react';
import { Image, Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { HapticTab } from '@/components/HapticTab';
import CustomNavBar from '@/components/CustomNavbar';



export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false }}
    tabBar={(props) => <CustomNavBar {...props} />} />
  );
}
