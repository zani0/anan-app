import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAvatarUrl = (profileName: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(profileName)}&background=random&color=fff&bold=true`;

import { useUser } from '@/context/UserContext'

export default function Header() {
  const { user } = useUser()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <View className="flex-row justify-between items-center px-4 mb-6 bg-white">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.push('/account')}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${user?.name || 'User'}`,
            }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
        <View>
          <Text className="font-poppins text-lg text-gray-800 capitalize">
            Hello! {user?.name || 'Friend'} 👋
          </Text>
          <Text className="text-base font-poppins text-gray-500">
            {greeting}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => console.log('Notifications')}>
        <Bell color="#5d198a" size={24} />
      </TouchableOpacity>
    </View>
  )
}
