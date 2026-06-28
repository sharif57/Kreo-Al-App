import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

export function RatingModal({ visible, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);

  const handleStarPress = async (starIdx: number) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) { }
    setRating(starIdx);
    setTimeout(() => {
      onSubmit(starIdx);
    }, 400); // small delay for visual feedback
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/75 px-6">
        <BlurView
          intensity={80}
          tint="dark"
          className="bg-white/10 border border-white/20 rounded-[32px] w-full max-w-[390px] px-8 py-10 items-start overflow-hidden gap-[10px]"
        >

          {/* App Brand Icon Box */}
          <View className="w-14 h-14 bg-black rounded-xl justify-start items-center border border-white/5 shadow-md">
            {/* <KreoLogo size={42} /> */}
            <Image
              source={require('../assets/images/icon.png')}
              style={{ width: 40, height: 40 }}
            />
          </View>

          {/* Title & Subtitle */}
          <Text className="text-white text-[28px] font-bold text-start">Enjoying Kreo AI?</Text>
          <Text className="text-white text-lg font-normal text-start leading-relaxed ">
            Tap a star to rate it on the App Store.
          </Text>

          {/* Horizontal Line Divider */}
          <View className="w-full h-[0.5px] bg-white pt-[16px" />

          {/* Star Icons Interaction Row */}
          <View className="flex-row items-center pt-[32px] justify-between w-full px-6">
            {[1, 2, 3, 4, 5].map((starIdx) => {
              const isSelected = starIdx <= rating;
              return (
                <Pressable
                  key={starIdx}
                  onPress={() => handleStarPress(starIdx)}
                  className="p-1"
                >
                  <SymbolView
                    name={{
                      ios: isSelected ? 'star.fill' : 'star',
                      android: isSelected ? 'star' : 'star_border',
                      web: 'star'
                    }}
                    tintColor={isSelected ? '#F59E0B' : '#FFFFFF'}
                    size={32}
                  />
                </Pressable>
              );
            })}
          </View>

          {/* Not Now Button */}
          <Pressable
            onPress={onClose}
            className="w-full py-3.5 bg-white rounded-full items-center justify-center"
          >
            <Text className="text-black font-bold text-sm">Not Now</Text>
          </Pressable>

        </BlurView>
      </View>
    </Modal>
  );
}
