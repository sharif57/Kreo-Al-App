import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

import { IntroStep } from './profile-steps/IntroStep';
import { QuickSetupStep } from './profile-steps/QuickSetupStep';
import { NameInputStep } from './profile-steps/NameInputStep';
import { IdentityStep } from './profile-steps/IdentityStep';
import { AvatarStep } from './profile-steps/AvatarStep';
import { AgeStep } from './profile-steps/AgeStep';
import { PostingPreferencesStep } from './profile-steps/PostingPreferencesStep';
import { AllSetStep } from './profile-steps/AllSetStep';

interface ProfileSetupFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function ProfileSetupFlow({ onComplete, onSkip }: ProfileSetupFlowProps) {
  // Steps: 'intro' | 1 | 2 | 3 | 4 | 5 | 6 | 'all_set'
  const [step, setStep] = useState<'intro' | number | 'all_set'>('intro');

  // Step 1 states
  const [photoLibrary, setPhotoLibrary] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saveToGallery, setSaveToGallery] = useState(false);

  // Step 2 states
  const [name, setName] = useState('');

  // Step 3 states
  const [identity, setIdentity] = useState<'Male' | 'Female' | 'Other' | null>(null);

  // Step 4 states
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Step 5 states
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const ageOptions = ['Under 18', '18-24', '25-29', '30-34', '35-39', '40-44', '44+'];

  // Step 6 states
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const platforms = ['Tiktok', 'Facebook', 'Twitter', 'Snapchat', 'Pinterest', 'Instagram'];

  // Handle all set auto-transition
  useEffect(() => {
    if (step === 'all_set') {
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}

    if (step === 'intro') {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      setStep(6);
    } else if (step === 6) {
      setStep('all_set');
    }
  };

  const handleBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}

    if (step === 1) {
      setStep('intro');
    } else if (typeof step === 'number' && step > 1) {
      setStep(step - 1);
    }
  };

  const handlePickImage = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log('Image pick error', e);
    }
  };

  const handleTakePhoto = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Camera permissions are required to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log('Camera error', e);
    }
  };

  const togglePlatform = (plat: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    if (selectedPlatforms.includes(plat)) {
      setSelectedPlatforms(selectedPlatforms.filter(x => x !== plat));
    } else {
      setSelectedPlatforms([...selectedPlatforms, plat]);
    }
  };

  return (
    <View className="flex-1 bg-[#121212]">
      {step === 'intro' && (
        <IntroStep onStart={handleNext} onSkip={onSkip} />
      )}

      {step === 1 && (
        <QuickSetupStep
          photoLibrary={photoLibrary}
          setPhotoLibrary={setPhotoLibrary}
          notifications={notifications}
          setNotifications={setNotifications}
          saveToGallery={saveToGallery}
          setSaveToGallery={setSaveToGallery}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={onSkip}
        />
      )}

      {step === 2 && (
        <NameInputStep
          name={name}
          setName={setName}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={onSkip}
        />
      )}

      {step === 3 && (
        <IdentityStep
          name={name}
          identity={identity}
          setIdentity={setIdentity}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={onSkip}
        />
      )}

      {step === 4 && (
        <AvatarStep
          avatarUri={avatarUri}
          onPickImage={handlePickImage}
          onTakePhoto={handleTakePhoto}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={onSkip}
        />
      )}

      {step === 5 && (
        <AgeStep
          ageRange={ageRange}
          setAgeRange={setAgeRange}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={onSkip}
          ageOptions={ageOptions}
        />
      )}

      {step === 6 && (
        <PostingPreferencesStep
          selectedPlatforms={selectedPlatforms}
          togglePlatform={togglePlatform}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={onSkip}
          platforms={platforms}
        />
      )}

      {step === 'all_set' && (
        <AllSetStep />
      )}
    </View>
  );
}
