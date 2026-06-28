import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function PromptInput({ value, onChangeText, placeholder = 'Type here a detailed description of what you want to see...' }: PromptInputProps) {
  return (
    <View className="bg-[#222222] rounded-[24px] p-5 mb-4 border border-white/5 relative min-h-[200px]">
      <View className="flex-row items-center mb-3">
        <SymbolView 
          name="text.bubble" 
          tintColor="#FFFFFF" 
          size={18} 
          style={{ marginRight: 10 }}
        />
        <Text className="text-white text-[16px] font-bold">
          Define the Scene
        </Text>
      </View>
      
      <TextInput
        className="text-[#888888] text-[14px] leading-5"
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={value}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top"
        style={{ flex: 1 }}
      />

      <Pressable className="absolute bottom-5 right-5 bg-white/10 px-4 py-2 rounded-full flex-row items-center border border-white/10">
        <SymbolView 
          name="sparkles" 
          tintColor="#FFFFFF" 
          size={14} 
          style={{ marginRight: 6 }}
        />
        <Text className="text-white text-[12px] font-semibold">Enhance</Text>
      </Pressable>
    </View>
  );
}
