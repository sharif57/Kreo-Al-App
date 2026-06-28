import React from 'react';
import { useRouter } from 'expo-router';
import { PaywallScreen } from '@/components/PaywallScreen';

export default function SubscriptionScreen() {
  const router = useRouter();

  return (
    <PaywallScreen onClose={() => router.back()} />
  );
}
