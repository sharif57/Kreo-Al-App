import { Pressable, Text } from 'react-native';

interface SelectionCardProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  style?: any;
}

export function SelectionCard({ label, isSelected, onSelect, style }: SelectionCardProps) {
  return (
    <Pressable
      onPress={onSelect}
      style={style}
      className={`w-full h-16 rounded-2xl justify-center px-6  border ${isSelected
        ? 'bg-white border-white'
        : 'bg-[#1C1C1E] border-white/5 active:bg-[#2C2C2E]'
        }`}
    >
      <Text
        className={`text-[16px] font-semibold ${isSelected ? 'text-black' : 'text-white'
          }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
