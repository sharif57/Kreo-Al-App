import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { SetupHeader } from './SetupHeader';
import { ActionButton } from './ActionButton';

interface AvatarProps {
  avatarUri: string | null;
  onPickImage: () => void;
  onTakePhoto: () => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function AvatarStep({ avatarUri, onPickImage, onTakePhoto, onNext, onBack, onSkip }: AvatarProps) {
  return (
    <View className="flex-1 justify-between pb-12">
      <View>
        <SetupHeader currentStep={4} totalSteps={6} onBack={onBack} onSkip={onSkip} />
        <View className="px-6 pt-6 items-center">
          <Text className="text-white text-[32px] font-bold text-center">Add Your Avatar</Text>
          <Text className="text-white/60 text-[14px] mt-2 leading-relaxed text-center">
            Give your Kreo experience a more personal touch
          </Text>

          <View className="my-16 items-center justify-center">
            <View style={styles.avatarBorder}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <SymbolView name="person.fill" tintColor="rgba(255,255,255,0.4)" size={64} />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View className="px-6 w-full">
        <View style={{ marginBottom: 12 }}>
          <ActionButton title="Upload from Gallery" onPress={onPickImage} />
        </View>
        <View style={{ marginBottom: 12 }}>
          <ActionButton title="Take Photo" onPress={onTakePhoto} variant="secondary" />
        </View>
        <ActionButton title="Continue" onPress={onNext} variant="accent" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarBorder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  avatarImage: {
    width: 148,
    height: 148,
    borderRadius: 74,
  },
  avatarPlaceholder: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
