import { View } from 'react-native';

interface KreoLogoProps {
  size?: number;
}

export function KreoLogo({ size = 70 }: KreoLogoProps) {
  const scale = size / 70;
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 50 * scale, height: 50 * scale, position: 'relative' }}>
        {/* Left vertical curving line */}

        <View style={{
          position: 'absolute',
          left: 10 * scale,
          top: 2 * scale,
          width: 11 * scale,
          height: 44 * scale,
          backgroundColor: '#FFFFFF',
          borderRadius: 6 * scale,
          transform: [{ rotate: '12deg' }]
        }} />
        {/* Top right diagonal line */}
        <View style={{
          position: 'absolute',
          left: 19 * scale,
          top: 7 * scale,
          width: 26 * scale,
          height: 11 * scale,
          backgroundColor: '#FFFFFF',
          borderRadius: 6 * scale,
          transform: [{ rotate: '-35deg' }]
        }} />
        {/* Bottom right diagonal line */}
        <View style={{
          position: 'absolute',
          left: 17 * scale,
          top: 27 * scale,
          width: 26 * scale,
          height: 11 * scale,
          backgroundColor: '#FFFFFF',
          borderRadius: 6 * scale,
          transform: [{ rotate: '35deg' }]
        }} />
      </View>
    </View>
  );
}
