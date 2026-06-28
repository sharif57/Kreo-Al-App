import { Pressable, Text } from 'react-native';
import { SocialIcon } from './SocialIcon';

interface SocialGridCardProps {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

export function SocialGridCard({ name, isSelected, onPress }: SocialGridCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: '48%', aspectRatio: 1.4, marginBottom: 16 }}
      className={`rounded-2xl items-center justify-center  p-4 border ${isSelected
        ? 'bg-white border-white'
        : 'bg-[#1C1C1E] border-white/5 active:bg-[#2C2C2E]'
        }`}
    >
      <SocialIcon name={name} color={isSelected ? '#000000' : '#FFFFFF'} />
      <Text
        className={`text-[14px] font-semibold mt-3 ${isSelected ? 'text-black' : 'text-white'
          }`}
      >
        {name}
      </Text>
    </Pressable>
  );
}
