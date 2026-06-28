import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  iconName?: any;
  iconNode?: React.ReactNode;
  variant?: 'dark' | 'light';
}

export function AuthButton({ title, onPress, iconName, iconNode, variant = 'dark' }: AuthButtonProps) {
  const isDark = variant === 'dark';

  return (
    <Pressable
      onPress={onPress}
      className={`w-full h-[52px] rounded-2xl flex-row items-center justify-center mb-4 active:opacity-80 ${
        isDark ? 'bg-[#262626]' : 'bg-white'
      }`}
    >
      <View className="absolute left-6">
        {iconNode ? (
          iconNode
        ) : iconName ? (
          <SymbolView
            name={iconName}
            tintColor={isDark ? '#FFFFFF' : '#121212'}
            size={18}
          />
        ) : null}
      </View>
      <Text className={`text-[15px] font-semibold ${isDark ? 'text-white/90' : 'text-[#121212]'}`}>
        {title}
      </Text>
    </Pressable>
  );
}
