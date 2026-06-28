import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface PaywallScreenProps {
  onClose: () => void;
}

export function PaywallScreen({ onClose }: PaywallScreenProps) {
  const [selectedPackage, setSelectedPackage] = useState<'weekly' | 'yearly'>('weekly');

  return (
    <View className="flex-1 bg-[#121212]">
      {/* Background Image / Collage Simulation */}
      <View className="absolute top-0 left-0 right-0 h-[50%]">
        <Image
          source={require('../assets/images/background.png')}
          className="w-full h-full opacity-60"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', '#121212']}
          className="absolute bottom-0 left-0 right-0 h-40"
        />
      </View>

      {/* Close Button */}
      <Pressable
        onPress={onClose}
        className="absolute top-14 right-6 z-20 p-2"
      >
        <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} tintColor="#FFFFFF" size={24} />
      </Pressable>

      {/* Content Area */}
      <View className="flex-1 justify-end px-6 pb-12 z-10">

        {/* Header Text */}
        <Text className="text-white text-[32px] font-bold text-center leading-tight mb-6">
          Unlock Everything{'\n'}with Pro
        </Text>

        {/* Features List */}
        <View className="items-center mb-10 gap-[14px]">
          <View className="flex-row items-center w-[220px]">
            <LinearGradient colors={['#FFCC00', '#D76B00']} className="w-6 h-6 rounded-full items-center justify-center mr-3">
              <SymbolView name={{ ios: 'pencil', android: 'edit', web: 'edit' }} tintColor="#FFFFFF" size={14} />
            </LinearGradient>
            <Text className="text-white/80 text-[15px] font-medium">All Edit Tools</Text>
          </View>
          <View className="flex-row items-center w-[220px]">
            <LinearGradient colors={['#FFCC00', '#D76B00']} className="w-6 h-6 rounded-full items-center justify-center mr-3">
              <SymbolView name={{ ios: 'photo.on.rectangle', android: 'photo_library', web: 'photo_library' }} tintColor="#FFFFFF" size={14} />
            </LinearGradient>
            <Text className="text-white/90 text-[15px] font-medium">All Templated</Text>
          </View>
          <View className="flex-row items-center w-[220px]">
            <LinearGradient colors={['#FFCC00', '#D76B00']} className="w-6 h-6 rounded-full items-center justify-center mr-3">
              <SymbolView name={{ ios: 'star.fill', android: 'star', web: 'star' }} tintColor="#FFFFFF" size={14} />
            </LinearGradient>
            <Text className="text-white/90 text-[15px] font-medium">Weekly 1,000 Coins</Text>
          </View>
          <View className="flex-row items-center w-[220px]">
            <LinearGradient colors={['#FFCC00', '#D76B00']} className="w-6 h-6 rounded-full items-center justify-center mr-3">
              <SymbolView name={{ ios: 'diamond.fill', android: 'diamond', web: 'diamond' }} tintColor="#FFFFFF" size={14} />
            </LinearGradient>
            <Text className="text-white/90 text-[15px] font-medium">Exclusive FX & Style</Text>
          </View>
        </View>

        {/* Options */}
        <View className="gap-5 mb-10">
          {/* Weekly Option */}
          <Pressable
            onPress={() => setSelectedPackage('weekly')}
            className={`w-full rounded-[24px] px-6 py-[22px] flex-row justify-between items-center relative border border-white ${selectedPackage === 'weekly' ? 'bg-[#404040] border-white' : 'bg-[#262626] border-transparent'}`}
          >
            <LinearGradient colors={['#FFCC00', '#D76B00']} className="absolute -top-[14px] right-6 px-4 py-1.5 rounded-full">
              <Text className="text-white text-xs font-semibold">Best Deal</Text>
            </LinearGradient>
            <Text className={`${selectedPackage === 'weekly' ? 'text-white' : 'text-white/70'} text-[17px] font-normal`}>Weekly</Text>
            <Text className={`${selectedPackage === 'weekly' ? 'text-white font-semibold' : 'text-white/70 font-normal'} text-[17px]`}>$199.99 / Year</Text>
          </Pressable>

          {/* Yearly Option */}
          <Pressable
            onPress={() => setSelectedPackage('yearly')}
            className={`w-full rounded-[24px] px-6 py-[22px] flex-row justify-between items-center border border-white ${selectedPackage === 'yearly' ? 'bg-[#404040] border-white' : 'bg-[#262626] border-transparent'}`}
          >
            <Text className={`${selectedPackage === 'yearly' ? 'text-white' : 'text-white/70'} text-[17px] font-normal`}>Yearly</Text>
            <Text className={`${selectedPackage === 'yearly' ? 'text-white font-semibold' : 'text-white/70 font-normal'} text-[17px]`}>$199.99 / Year</Text>
          </Pressable>
        </View>

        {/* Footer text */}
        <View className="flex-row items-center justify-center mb-6 gap-2">
          <SymbolView name={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }} tintColor="#F59E0B" size={14} />
          <Text className="text-white/60 text-xs font-medium">Cancel Anytime, Auto Renewable</Text>
        </View>

        {/* Subscribe Button */}
        <Pressable
          onPress={onClose}
          className="w-full h-[58px] bg-white rounded-[28px] items-center justify-center mb-6 active:opacity-80"
        >
          <Text className="text-black text-lg font-semibold">Subscribe</Text>
        </Pressable>

        {/* Links */}
        <View className="flex-row items-center justify-center gap-6">
          <Text className="text-white/50 text-[11px] underline">Terms of Use</Text>
          <Text className="text-white/50 text-[11px] underline">Privacy Policy</Text>
        </View>

      </View>
    </View>
  );
}
