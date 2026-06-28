import React, { useState } from 'react';
import { View, Text, Pressable, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { InputField } from '../ui/InputField';

interface EmailSignInScreenProps {
  onBack: () => void;
  onSubmit: (email: string) => void;
}

export function EmailSignInScreen({ onBack, onSubmit }: EmailSignInScreenProps) {
  const [email, setEmail] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-[#121212]">
        {/* Header */}
        <View className="flex-row items-center pt-14 pb-4 px-6 relative">
          <Pressable onPress={onBack} className="absolute left-6 top-14 z-10 p-2 -ml-2">
            <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#FFFFFF" size={22} />
          </Pressable>
          <View className="flex-1 items-center">
            <Text className="text-white text-[22px] font-bold">Sign In</Text>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pt-2">
          <Text className="text-white/70 text-[15px] text-center mb-8">
            Enter your email to sign in
          </Text>

          <InputField 
            iconName={{ ios: 'envelope', android: 'mail', web: 'mail' }}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Pressable 
            onPress={() => onSubmit(email)}
            className="w-full h-[52px] bg-white rounded-full items-center justify-center mt-2 active:opacity-80"
          >
            <Text className="text-[#121212] text-[15px] font-semibold">Continue</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
