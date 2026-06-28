import React from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { SetupHeader } from './SetupHeader';
import { SetupSwitch } from './SetupSwitch';
import { ActionButton } from './ActionButton';

interface QuickSetupProps {
  photoLibrary: boolean;
  setPhotoLibrary: (val: boolean) => void;
  notifications: boolean;
  setNotifications: (val: boolean) => void;
  saveToGallery: boolean;
  setSaveToGallery: (val: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function QuickSetupStep({
  photoLibrary,
  setPhotoLibrary,
  notifications,
  setNotifications,
  saveToGallery,
  setSaveToGallery,
  onNext,
  onBack,
  onSkip,
}: QuickSetupProps) {
  return (
    <View className="flex-1 justify-between pb-12">
      <View>
        <SetupHeader currentStep={1} totalSteps={6} onBack={onBack} onSkip={onSkip} />
        <View className="px-6 pt-6">
          <Text className="text-white text-[32px] font-bold">Quick Setup</Text>
          <Text className="text-white/60 text-[14px] mt-2 leading-relaxed">
            Enable these to get the best experience on Kreo AI
          </Text>

          <View className="mt-8">
            {/* Photo Library */}
            <View style={{ marginBottom: 12 }} className="flex-row items-center justify-between p-4 bg-[#1C1C1E] rounded-2xl border border-white/5">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-11 h-11 bg-[#2C2C2E] rounded-xl items-center justify-center mr-4">
                  <SymbolView name="photo.on.rectangle" tintColor="#FFFFFF" size={20} />
                </View>
                <View>
                  <Text className="text-white font-semibold text-[16px]">Photo Library</Text>
                  <Text className="text-white/40 text-[12px] mt-0.5">Upload reference images</Text>
                </View>
              </View>
              <SetupSwitch value={photoLibrary} onValueChange={setPhotoLibrary} />
            </View>

            {/* Notifications */}
            <View style={{ marginBottom: 12 }} className="flex-row items-center justify-between p-4 bg-[#1C1C1E] rounded-2xl border border-white/5">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-11 h-11 bg-[#2C2C2E] rounded-xl items-center justify-center mr-4">
                  <SymbolView name="bell.fill" tintColor="#FFFFFF" size={20} />
                </View>
                <View>
                  <Text className="text-white font-semibold text-[16px]">Push Notifications</Text>
                  <Text className="text-white/40 text-[12px] mt-0.5">Get alerted when done</Text>
                </View>
              </View>
              <SetupSwitch value={notifications} onValueChange={setNotifications} />
            </View>

            {/* Save to Gallery */}
            <View className="flex-row items-center justify-between p-4 bg-[#1C1C1E] rounded-2xl border border-white/5">
              <View className="flex-row items-center flex-1 pr-4">
                <View className="w-11 h-11 bg-[#2C2C2E] rounded-xl items-center justify-center mr-4">
                  <SymbolView name="arrow.down.to.line" tintColor="#FFFFFF" size={20} />
                </View>
                <View>
                  <Text className="text-white font-semibold text-[16px]">Save to Gallery</Text>
                  <Text className="text-white/40 text-[12px] mt-0.5">Auto-save creations</Text>
                </View>
              </View>
              <SetupSwitch value={saveToGallery} onValueChange={setSaveToGallery} />
            </View>
          </View>
        </View>
      </View>

      <View className="px-6 w-full">
        <ActionButton title="Next" onPress={onNext} />
      </View>
    </View>
  );
}
