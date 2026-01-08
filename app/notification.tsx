
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { GlassView } from 'expo-glass-effect';
import { useTheme } from '@react-navigation/native';
import * as Device from 'expo-device';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationScreen() {
  const theme = useTheme();
  const [isScheduled, setIsScheduled] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  async function requestPermissions() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission required', 'Please enable notifications in Settings');
    }
  }

  async function scheduleNotification() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time's up! ⏰",
          body: '3 seconds have passed',
          sound: true,
        },
        trigger: {
          seconds: 3,
        },
      });

      setIsScheduled(true);
      
      // Reset button after notification should have fired
      setTimeout(() => {
        setIsScheduled(false);
      }, 4000);

    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification');
      console.error(error);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Local Notification</Text>
      <Text style={[styles.description, { color: theme.colors.text }]}>
        Tap the button to schedule a notification in 3 seconds.
        {'\n\n'}
        The notification will appear even if you close the app or switch to another app.
      </Text>

      <Pressable 
        onPress={scheduleNotification} 
        disabled={isScheduled}
        style={({ pressed }) => [
          styles.notificationButton,
          isScheduled && styles.scheduledButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {isScheduled ? '✓ Scheduled (3s)' : 'Schedule Notification'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.closeButton}>
        <GlassView style={styles.glassButton} glassEffectStyle="clear">
          <Text style={[styles.closeText, { color: theme.colors.primary }]}>Close</Text>
        </GlassView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  notificationButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  scheduledButton: {
    backgroundColor: '#34C759',
  },
  pressedButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
  },
  glassButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
