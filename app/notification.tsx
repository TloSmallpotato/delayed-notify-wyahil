
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View, Pressable, Alert, Platform } from 'react-native';
import * as Device from 'expo-device';
import { GlassView } from 'expo-glass-effect';
import { useTheme } from '@react-navigation/native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        Alert.alert('Permission Required', 'Please enable notifications in Settings');
        setPermissionGranted(false);
        return;
      }
      
      setPermissionGranted(true);
    }
  };

  const scheduleDelayedNotification = async () => {
    if (!permissionGranted) {
      Alert.alert('Permission Required', 'Please enable notifications first');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delayed Notification 🔔",
        body: 'This notification was scheduled 3 seconds ago!',
        sound: true,
      },
      trigger: {
        seconds: 3,
      },
    });

    Alert.alert('Scheduled!', 'Notification will appear in 3 seconds');
  };

  const sendInstantNotification = async () => {
    if (!permissionGranted) {
      Alert.alert('Permission Required', 'Please enable notifications first');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Instant Notification ⚡",
        body: 'This notification appeared immediately!',
        sound: true,
      },
      trigger: null, // null trigger means instant
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Local Notifications</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Test local notifications on your device
      </Text>

      <Pressable onPress={scheduleDelayedNotification}>
        <GlassView style={styles.button} glassEffectStyle="clear">
          <Text style={[styles.buttonText, { color: theme.colors.primary }]}>
            Schedule 3s Notification
          </Text>
        </GlassView>
      </Pressable>

      <Pressable onPress={sendInstantNotification}>
        <GlassView style={[styles.button, styles.instantButton]} glassEffectStyle="clear">
          <Text style={[styles.buttonText, { color: theme.colors.primary }]}>
            Send Instant Notification
          </Text>
        </GlassView>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <GlassView style={styles.button} glassEffectStyle="clear">
          <Text style={[styles.buttonText, { color: theme.colors.primary }]}>Close</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  instantButton: {
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
