import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';

export function HomeHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 pt-14 pb-4 bg-[#121212]">
      {/* Brand Name */}
      <Text className="text-white text-[22px] font-bold tracking-tight">Kreo AI</Text>

      {/* Right Actions */}
      <View className="flex-row items-center gap-3">
        {/* Pro Badge */}
        <Pressable className="bg-[#007AFF] px-3 py-1 rounded-full">
          <Text className="text-white text-[13px] font-bold">Pro</Text>
        </Pressable>

        {/* Coins Badge */}
        <Pressable className="flex-row items-center bg-[#262626] px-2 py-1 rounded-full gap-1 border border-white/5">
          <SymbolView name={{ ios: 'star.circle.fill', android: 'stars', web: 'stars' } as any} tintColor="#F59E0B" size={16} />
          <Text className="text-[#F59E0B] text-[13px] font-bold pr-1">100</Text>
        </Pressable>

        {/* Settings Icon */}
        <Pressable onPress={() => router.push('/settings')} className="p-1">
          <SymbolView name={{ ios: 'gearshape', android: 'settings', web: 'settings' } as any} tintColor="#FFFFFF" size={22} />
        </Pressable>
      </View>
    </View>
  );
}
