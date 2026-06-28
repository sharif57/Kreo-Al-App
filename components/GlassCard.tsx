import React from 'react';
import { View, ViewStyle } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <View
      className={`bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl ${className}`}
      style={style}
    >
      {children}
    </View>
  );
};
