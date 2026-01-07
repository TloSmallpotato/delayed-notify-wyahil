
import * as Device from 'expo-device';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from "react";
import { colors } from '@/styles/commonStyles';

// Set up notification handler BEFORE the component
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      scheduleNotification();
      setCountdown(null);
    }
  }, [countdown]);

  async function requestPermissions() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert('Permission Required', 'Please enable notifications in your device settings to use this feature.');
      return false;
    }
    
    console.log('Notification permissions granted');
    return true;
  }

  async function scheduleNotification() {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time's Up! ⏰",
          body: 'Your 3-second notification is here!',
          sound: true,
          data: { timestamp: Date.now() },
        },
        trigger: null, // null means immediate notification
      });
      
      console.log('Notification scheduled successfully');
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Error', 'Failed to schedule notification. Please try again.');
    }
  }

  const handlePress = () => {
    console.log('Button pressed - starting countdown');
    setCountdown(3);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handlePress}
        disabled={countdown !== null}
      >
        <Text style={styles.buttonText}>
          {countdown !== null 
            ? `Notifying in ${countdown}s...` 
            : 'Notify Me in 3 Seconds'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.hint}>
        Tap the button to receive a notification after 3 seconds
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  button: {
    backgroundColor: colors.primary || '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    marginTop: 24,
    fontSize: 14,
    color: colors.text,
    opacity: 0.6,
    textAlign: 'center',
  },
});
