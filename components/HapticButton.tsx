import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

interface HapticButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
  style?: any;
  styleType?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'custom';
  disabled?: boolean;
  loading?: boolean;
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
}

export const HapticButton: React.FC<HapticButtonProps> = ({
  onPress,
  children,
  className = '',
  style,
  styleType = 'primary',
  disabled = false,
  loading = false,
  hapticType = 'light',
}) => {
  const triggerHaptic = async () => {
    if (disabled || loading) return;

    try {
      switch (hapticType) {
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        case 'light':
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
      }
    } catch (e) {
      // Haptics might fail on web/emulator, ignore silently
    }

    onPress();
  };

  // Base styles
  let buttonStyle = 'flex-row items-center justify-center transition duration-200 active:scale-98 ';

  if (styleType === 'primary') {
    buttonStyle += 'rounded-xl py-3.5 px-6 bg-white border border-violet-500 shadow-lg shadow-violet-500/20';
  } else if (styleType === 'secondary') {
    buttonStyle += 'rounded-xl py-3.5 px-6 bg-dark-card border border-dark-border';
  } else if (styleType === 'accent') {
    buttonStyle += 'rounded-xl py-3.5 px-6 bg-cyan-500 border border-cyan-400 shadow-lg shadow-cyan-500/20';
  } else if (styleType === 'danger') {
    buttonStyle += 'rounded-xl py-3.5 px-6 bg-red-500 border border-red-400';
  } else if (styleType === 'ghost') {
    buttonStyle += 'rounded-xl py-3.5 px-6 bg-transparent border border-transparent';
  } else if (styleType === 'custom') {
    // Keep only base styles, let className handle padding, background, borders, radius
  }

  if (disabled || loading) {
    buttonStyle += ' opacity-50';
  }

  return (
    <Pressable
      onPress={triggerHaptic}
      disabled={disabled || loading}
      className={`${buttonStyle} ${className}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : typeof children === 'string' ? (
        <Text className="text-white font-semibold text-center text-base">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};
