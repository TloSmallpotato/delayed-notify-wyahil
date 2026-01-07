
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform, Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { colors } from '@/styles/commonStyles';

// Configure notification handler to show alerts when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    // Request notification permissions on mount
    requestPermissions();
  }, []);

  useEffect(() => {
    // Countdown timer
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
    }
  }, [countdown]);

  async function requestPermissions() {
    if (!Device.isDevice) {
      console.log('Must use physical device for notifications');
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get notification permissions');
      setPermissionGranted(false);
      return;
    }
    
    console.log('Notification permissions granted');
    setPermissionGranted(true);
  }

  async function scheduleNotification() {
    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Please enable notifications in your device settings to use this feature.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsScheduling(true);
    setCountdown(3);

    try {
      // Schedule notification for 3 seconds from now
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time's Up! ⏰",
          body: 'Your 3-second delayed notification has arrived!',
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          seconds: 3,
        },
      });

      console.log('Notification scheduled successfully for 3 seconds');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsScheduling(false);
      }, 3000);
    } catch (error) {
      console.error('Error scheduling notification:', error);
      setIsScheduling(false);
      setCountdown(null);
      Alert.alert('Error', 'Failed to schedule notification. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Delayed Notification</Text>
        <Text style={styles.subtitle}>
          Tap the button to receive a notification in 3 seconds
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            isScheduling && styles.buttonDisabled
          ]}
          onPress={scheduleNotification}
          disabled={isScheduling}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isScheduling 
              ? `Notification in ${countdown}s...` 
              : 'Schedule Notification'}
          </Text>
        </TouchableOpacity>

        {!permissionGranted && (
          <Text style={styles.warningText}>
            ⚠️ Notification permissions not granted
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 16,
    minWidth: 250,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 122, 255, 0.3)',
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  warningText: {
    marginTop: 24,
    fontSize: 14,
    color: colors.accent,
    textAlign: 'center',
  },
});
