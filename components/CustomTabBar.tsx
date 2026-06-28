import React, { useEffect } from 'react';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TAB_ICONS: Record<string, any> = {
  index: { ios: 'house', android: 'home', web: 'home' },
  discover: { ios: 'safari', android: 'explore', web: 'explore' },
  generate: { ios: 'photo.badge.plus', android: 'add_photo_alternate', web: 'add_photo_alternate' },
  library: { ios: 'heart', android: 'favorite', web: 'favorite' },
};

const TAB_ICON_SIZES: Record<string, number> = {
  index: 22,
  discover: 22,
  generate: 24,
  library: 22,
};

function TabItem({
  route,
  isFocused,
  label,
  onPress,
}: {
  route: { key: string; name: string };
  isFocused: boolean;
  label: string;
  onPress: () => void;
}) {
  const progress = useSharedValue(isFocused ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(isFocused ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', '#FFFFFF']
    ),
    transform: [{ scale: scale.value }],
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.5)', '#000000']
    ),
    opacity: withTiming(1, { duration: 200 }),
  }));

  const iconColor = isFocused ? '#000000' : 'rgba(255, 255, 255, 0.5)';
  const iconName = TAB_ICONS[route.name];
  const iconSize = TAB_ICON_SIZES[route.name] ?? 22;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.9, { damping: 15, stiffness: 200 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      }}
      style={[styles.tabItem, animatedStyle]}
    >
      {iconName && (
        <Animated.View>
          <SymbolView name={iconName} tintColor={iconColor} size={iconSize} />
        </Animated.View>
      )}
      <Animated.Text style={[styles.tabLabel, animatedLabelStyle]}>
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
}

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
        <View style={styles.tabRow}>
          {state.routes.map((route: { key: string; name: string }, index: number) => {
            const { options } = descriptors[route.key];

            // Skip hidden tabs (like settings)
            if (route.name === 'settings') return null;

            const label = (options.title ?? route.name) as string;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabItem
                key={route.key}
                route={route}
                isFocused={isFocused}
                label={label}
                onPress={onPress}
              />
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    height: 68,
    borderRadius: 34,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 34,
    overflow: 'hidden',
  },
  tabRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 32,
    gap: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
});
