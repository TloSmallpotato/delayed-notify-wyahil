
import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

// Set up notification handler BEFORE the component
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [isScheduled, setIsScheduled] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  async function requestPermissions() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert('Permission Required', 'Please enable notifications in Settings to use this feature.');
      return false;
    }
    
    console.log('iOS notification permissions granted');
    return true;
  }

  async function handlePress() {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      console.log('iOS: Scheduling notification for 3 seconds from now');
      
      // Schedule notification with native iOS timer (works in background)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time's Up! ⏰",
          body: 'Your 3-second notification is here!',
          sound: true,
          data: { timestamp: Date.now() },
        },
        trigger: {
          seconds: 3, // Native iOS timer - works even when app is closed
        },
      });
      
      setIsScheduled(true);
      console.log('iOS notification scheduled successfully - will fire in 3 seconds even if app is closed');
      
      // Reset button state after notification should have fired
      setTimeout(() => {
        setIsScheduled(false);
      }, 4000);

    } catch (error) {
      console.error('Error scheduling iOS notification:', error);
      Alert.alert('Error', 'Failed to schedule notification. Please try again.');
    }
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Delayed Notify',
          headerLargeTitle: true,
        }} 
      />
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.button, isScheduled && styles.scheduledButton]}
          onPress={handlePress}
          disabled={isScheduled}
        >
          <Text style={styles.buttonText}>
            {isScheduled 
              ? '✓ Scheduled (3s)' 
              : 'Notify Me in 3 Seconds'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.hint}>
          Tap the button to schedule a notification in 3 seconds.
          {'\n\n'}
          The notification will appear even if you close the app or switch to another app.
        </Text>

        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => router.push('/ota-info')}
        >
          <IconSymbol
            ios_icon_name="info.circle.fill"
            android_material_icon_name="info"
            size={24}
            color={colors.primary || '#007AFF'}
          />
          <Text style={[styles.infoButtonText, { color: colors.primary || '#007AFF' }]}>
            How to Push OTA Updates
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
  scheduledButton: {
    backgroundColor: '#34C759',
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
    lineHeight: 22,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  infoButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
