import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import { InputField } from '../ui/InputField';

interface OTPVerificationScreenProps {
  email: string;
  onBack: () => void;
  onSubmit: (otp: string) => void;
}

export function OTPVerificationScreen({ email, onBack, onSubmit }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-[#121212]">
        {/* Header */}
        <View className="flex-row items-center pt-14 pb-4 px-6 relative">
          <Pressable onPress={onBack} className="absolute left-6 top-14 z-10 p-2 -ml-2">
            <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#FFFFFF" size={22} />
          </Pressable>
          <View className="flex-1 items-center">
            <Text className="text-white text-[22px] font-bold">Verify Mail</Text>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pt-2">
          <Text className="text-white/70 text-[15px] text-center mb-8 px-4 leading-relaxed">
            An email with the code has been sent to{'\n'}
            <Text className="text-white/90">{email || 'user@example.com'}</Text>
          </Text>

          <InputField
            iconName={{ ios: 'envelope', android: 'mail', web: 'mail' }}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />

          <Pressable
            onPress={() => onSubmit(otp)}
            className="w-full h-[52px] bg-white rounded-full items-center justify-center mt-2 mb-6 active:opacity-80"
          >
            <Text className="text-[#121212] text-[15px] font-semibold">Submit</Text>
          </Pressable>

          <View className="flex-row justify-center items-center">
            <Text className="text-white/60 text-[13px]">Didn't get the code? </Text>
            <Pressable>
              <Text className="text-[#F59E0B] text-[13px] font-semibold">Try Again</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
