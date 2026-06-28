import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import { SymbolView } from 'expo-symbols';

interface InputFieldProps extends TextInputProps {
  iconName?: any;
}

export function InputField({ iconName, ...props }: InputFieldProps) {
  return (
    <View className="w-full h-[52px] bg-[#262626] rounded-xl flex-row items-center px-4 mb-4">
      {iconName && (
        <View className="mr-3">
          <SymbolView 
            name={iconName} 
            tintColor="#888888" 
            size={18} 
          />
        </View>
      )}
      <TextInput
        className="flex-1 text-white text-[15px] font-medium h-full"
        placeholderTextColor="#888888"
        {...props}
      />
    </View>
  );
}
