import { PaywallScreen } from '@/components/PaywallScreen';
import { RatingModal } from '@/components/RatingModal';
import { TrialEnabledScreen } from '@/components/TrialEnabledScreen';
import { AuthOptionsScreen } from '@/components/auth/AuthOptionsScreen';
import { EmailSignInScreen } from '@/components/auth/EmailSignInScreen';
import { OTPVerificationScreen } from '@/components/auth/OTPVerificationScreen';
import { VerifiedScreen } from '@/components/auth/VerifiedScreen';
import { ProfileSetupFlow } from '@/components/auth/ProfileSetupFlow';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, StatusBar, Text, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type FlowState = 'splash1' | 'splash2' | 'onboarding1' | 'onboarding2' | 'profile_setup' | 'trial_enabled' | 'paywall' | 'auth_options' | 'auth_email' | 'auth_otp' | 'auth_verified';

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentState, setCurrentState] = useState<FlowState>('splash1');
  const [progress, setProgress] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Fade animations for smooth transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Splash Screen 1 timer (1.5 seconds)
    if (currentState === 'splash1') {
      const timer = setTimeout(() => {
        transitionTo('splash2');
      }, 1500);
      return () => clearTimeout(timer);
    }

    // 2. Splash Screen 2 Loader simulation (1.8 seconds)
    if (currentState === 'splash2') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              transitionTo('onboarding1');
            }, 300);
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }

    // 3. Trial Enabled screen timer (3 seconds) -> dashboard
    if (currentState === 'trial_enabled') {
      const timer = setTimeout(() => {
        transitionTo('paywall');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  const transitionTo = (nextState: FlowState) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setCurrentState(nextState);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }

    if (currentState === 'onboarding1') {
      transitionTo('onboarding2');
    } else if (currentState === 'onboarding2') {
      setShowRatingModal(true);
    }
  };

  const handleBack = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }

    if (currentState === 'onboarding2') {
      transitionTo('onboarding1');
    } else if (currentState === 'onboarding1') {
      transitionTo('splash2');
    }
  };

  const finishFlow = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) { }
    setShowRatingModal(false);
    transitionTo('auth_options');
  };

  const closePaywall = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-[#121212] justify-center items-center">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Animated.View style={{ flex: 1, width: '100%', opacity: fadeAnim }}>

        {/* ==================== SPLASH SCREEN 1 ==================== */}
        {currentState === 'splash1' && (
          <View className="flex-1 justify-center items-center bg-[#121212]">
            {/* <KreoLogo size={80} /> */}
            <Image source={require('../assets/images/icon.png')} ></Image>
          </View>
        )}

        {/* ==================== SPLASH SCREEN 2 ==================== */}
        {currentState === 'splash2' && (
          <View className="flex-1 justify-center items-center bg-[#121212]">
            <View className="items-center mb-6">
              <Image source={require('../assets/images/splash.png')} ></Image>

            </View>

            {/* Custom progress loader bar at the bottom */}
            <View className="absolute bottom-16 items-center">
              <View className="w-20 bg-white/20 h-[5px] rounded-full overflow-hidden">
                <View
                  style={{ width: `${progress}%` }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </View>
            </View>
          </View>
        )}

        {/* ==================== ONBOARDING SCREENS ==================== */}
        {(currentState === 'onboarding1' || currentState === 'onboarding2') && (
          <View className="flex-1 bg-black relative">

            {/* Background Image with Overlay */}
            <Image
              source={
                currentState === 'onboarding1'
                  ? require('../assets/images/image1.png')
                  : require('../assets/images/image2.png')
              }
              className="w-full h-full absolute inset-0"
              resizeMode="cover"
            />

            {/* Subtle Vignette Gradient Overlay */}
            <View className="absolute inset-0 bg-black/30" />
            <LinearGradient
              colors={['transparent', 'rgba(26,26,26,0.8)', '#1A1A1A']}
              className="absolute bottom-0 left-0 right-0 h-[50%]"
            />

            {/* Top Bar with Back Button */}
            <View className="absolute top-12 left-6 z-10">
              <Pressable
                onPress={handleBack}
                className="w-10 h-10 items-center justify-center"
              >
                <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#EEEEEE" size={20} />
              </Pressable>
            </View>

            {/* Bottom Content Area */}
            <View className="absolute bottom-12 left-0 right-0 px-8 items-center">

              {/* Onboarding Titles */}
              <View className="items-center mb-6">
                <Text className="text-white text-[32px] font-semibold text-center leading-tight tracking-tight">
                  {currentState === 'onboarding1' ? 'Create' : 'Stunning'}
                </Text>
                <Text className="text-white text-[32px] font-semibold text-center leading-tight tracking-tight mt-1">
                  {currentState === 'onboarding1' ? 'with the Power of AI' : 'AI Video Creation'}
                </Text>
              </View>

              {/* Dots Pagination Indicators */}
              {currentState === 'onboarding1' ? (
                <View className="flex-row items-center justify-center mb-8 gap-2">
                  <View className="w-7 h-2.5 bg-amber-500 rounded-full" />
                  <View className="w-2.5 h-2.5 bg-white/40 rounded-full" />
                  <View className="w-2.5 h-2.5 bg-white/40 rounded-full" />
                </View>
              ) : (
                <View className="flex-row items-center justify-center mb-8 gap-2">
                  <View className="w-2.5 h-2.5 bg-white/40 rounded-full" />
                  <View className="w-7 h-2.5 bg-amber-500 rounded-full" />
                  <View className="w-2.5 h-2.5 bg-white/40 rounded-full" />
                </View>
              )}

              {/* Primary Action Button */}
              <Pressable
                onPress={handleNext}
                className="w-full h-14 rounded-[24px] bg-white items-center justify-center flex-row active:opacity-80"
              >
                <Text className="text-[#242424] font-medium text-base text-center">
                  {currentState === 'onboarding1' ? 'Continue' : 'Explore Kreo AI'}
                </Text>
              </Pressable>

            </View>
          </View>
        )}

        {/* ==================== AUTH FLOW SCREENS ==================== */}
        {currentState === 'auth_options' && (
          <AuthOptionsScreen
            onSkip={() => transitionTo('profile_setup')}
            onSelectEmail={() => transitionTo('auth_email')}
          />
        )}

        {currentState === 'auth_email' && (
          <EmailSignInScreen
            onBack={() => transitionTo('auth_options')}
            onSubmit={(email) => {
              transitionTo('auth_otp');
            }}
          />
        )}

        {currentState === 'auth_otp' && (
          <OTPVerificationScreen
            email="user@example.com"
            onBack={() => transitionTo('auth_email')}
            onSubmit={(otp) => {
              transitionTo('auth_verified');
            }}
          />
        )}

        {currentState === 'auth_verified' && (
          <VerifiedScreen
            onNext={() => transitionTo('profile_setup')}
          />
        )}

        {/* ==================== PROFILE SETUP FLOW ==================== */}
        {currentState === 'profile_setup' && (
          <ProfileSetupFlow
            onComplete={() => transitionTo('trial_enabled')}
            onSkip={() => transitionTo('trial_enabled')}
          />
        )}

        {/* ==================== TRIAL ENABLED SCREEN ==================== */}
        {currentState === 'trial_enabled' && (
          <TrialEnabledScreen onNext={() => transitionTo('paywall')} />
        )}

        {/* ==================== PAYWALL SCREEN ==================== */}
        {currentState === 'paywall' && (
          <PaywallScreen onClose={closePaywall} />
        )}

      </Animated.View>

      {/* ==================== APP STORE RATING DIALOG MODAL ==================== */}
      <RatingModal
        visible={showRatingModal}
        onClose={finishFlow}
        onSubmit={finishFlow}
      />

    </View>
  );
}
