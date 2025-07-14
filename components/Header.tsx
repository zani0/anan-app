// components/Header.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Bell } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Header() {
  const insets = useSafeAreaInsets()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <View
      className="flex-row justify-between items-center px-4 mb-6 bg-white"
    >
      <View className="flex-row items-center gap-3">
        <Image
          source={require('@/assets/images/avatar.png')}
          className="w-10 h-10 rounded-full"
        />
        <View>
          <Text className="font-poppins text-lg text-gray-800 capitalize">Hello! Zoe 👋</Text>
          <Text className="text-base font-poppins text-gray-500">{greeting}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => console.log('Notifications')}>
        <Bell color="#5d198a" size={24} />
      </TouchableOpacity>
    </View>
  )
}
