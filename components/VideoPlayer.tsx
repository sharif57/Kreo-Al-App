import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

interface VideoPlayerProps {
  source: string;
  style?: ViewStyle;
  className?: string;
  nativeControls?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  style,
  className = '',
  nativeControls = true,
}) => {
  const player = useVideoPlayer(source, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  return (
    <View className={`overflow-hidden rounded-xl bg-black ${className}`} style={style}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        nativeControls={nativeControls}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
});
