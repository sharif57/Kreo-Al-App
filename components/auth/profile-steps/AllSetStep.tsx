import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

export function AllSetStep() {
  return (
    <View className="flex-1 justify-center items-center bg-[#121212] px-6">
      <View className="w-24 h-24 rounded-full border-[3px] border-white/20 items-center justify-center mb-8 relative">
        <View style={StyleSheet.absoluteFill} className="border-[3px] border-[#FFCC00] rounded-full opacity-100" />
        <SymbolView name="checkmark" tintColor="#FFCC00" size={36} weight="bold" />
      </View>

      <Text className="text-white text-[24px] font-bold text-center">
        All Set, Thank You
      </Text>
      <Text className="text-white/60 text-[14px] text-center mt-3 leading-relaxed px-10">
        We're building your personalized Kreo AI experience
      </Text>
    </View>
  );
}
