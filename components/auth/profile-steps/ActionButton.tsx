import React from 'react';
import { Pressable, Text } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
}

export function ActionButton({ title, onPress, disabled = false, variant = 'primary' }: ActionButtonProps) {
  const getBgClass = () => {
    if (disabled) return 'bg-white/50';
    if (variant === 'secondary') return 'bg-[#2C2C2E] border border-white/5';
    if (variant === 'accent') return 'bg-[#FFCC00]';
    return 'bg-white';
  };

  const getTextClass = () => {
    if (disabled) return 'text-black/50';
    if (variant === 'secondary') return 'text-white';
    return 'text-black';
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`w-full h-14 rounded-full items-center justify-center active:opacity-85 ${getBgClass()}`}
    >
      <Text className={`font-semibold text-[16px] ${getTextClass()}`}>{title}</Text>
    </Pressable>
  );
}
