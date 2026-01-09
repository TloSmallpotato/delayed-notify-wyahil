
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { GlassView } from 'expo-glass-effect';
import { IconSymbol } from '@/components/IconSymbol';

export default function OTAInfoScreen() {
  const { colors } = useTheme();

  const steps = [
    {
      title: '1. Get Your Project ID',
      command: 'eas project:info',
      description: 'Run this command to get your EAS project ID. Copy the ID and replace [your-project-id] in app.json with it.',
    },
    {
      title: '2. Update app.json',
      command: null,
      description: 'Replace [your-project-id] in two places:\n• updates.url: "https://u.expo.dev/YOUR_PROJECT_ID"\n• extra.eas.projectId: "YOUR_PROJECT_ID"',
    },
    {
      title: '3. Build Your App',
      command: 'eas build --platform ios --profile production',
      description: 'Build your app with OTA updates enabled. This creates a production build that can receive updates.',
    },
    {
      title: '4. Submit to TestFlight',
      command: 'eas submit --platform ios',
      description: 'Submit your build to TestFlight for testing.',
    },
    {
      title: '5. Publish OTA Updates',
      command: 'eas update --branch production --message "Bug fixes"',
      description: 'When you make changes to your JavaScript code or assets, publish an OTA update. TestFlight users will automatically receive it!',
    },
  ];

  const notes = [
    'OTA updates work for JavaScript and asset changes only',
    'Native code changes require a new build',
    'Updates are downloaded in the background',
    'Users get updates on next app restart',
    'No App Store review needed for OTA updates!',
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'OTA Updates Guide',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol
                ios_icon_name="chevron.left"
                android_material_icon_name="arrow-back"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.header, { color: colors.text }]}>
            How to Push OTA Updates
          </Text>
          <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
            Over-The-Air updates let you push JavaScript and asset changes to your TestFlight users without resubmitting to the App Store.
          </Text>

          {steps.map((step, index) => (
            <GlassView key={index} style={styles.stepCard} tint="dark" intensity={20}>
              <Text style={[styles.stepTitle, { color: colors.text }]}>
                {step.title}
              </Text>
              <Text style={[styles.stepDescription, { color: colors.text, opacity: 0.8 }]}>
                {step.description}
              </Text>
              {step.command && (
                <View style={[styles.commandBox, { backgroundColor: colors.card }]}>
                  <Text style={[styles.commandText, { color: '#4CAF50' }]}>
                    $ {step.command}
                  </Text>
                </View>
              )}
            </GlassView>
          ))}

          <View style={styles.notesSection}>
            <Text style={[styles.notesHeader, { color: colors.text }]}>
              Important Notes
            </Text>
            {notes.map((note, index) => (
              <View key={index} style={styles.noteItem}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={20}
                  color="#4CAF50"
                />
                <Text style={[styles.noteText, { color: colors.text, opacity: 0.8 }]}>
                  {note}
                </Text>
              </View>
            ))}
          </View>

          <GlassView style={styles.configCard} tint="dark" intensity={20}>
            <Text style={[styles.configTitle, { color: colors.text }]}>
              Your Configuration
            </Text>
            <Text style={[styles.configText, { color: colors.text, opacity: 0.7 }]}>
              ✅ expo-updates installed{'\n'}
              ✅ runtimeVersion configured{'\n'}
              ✅ Updates URL configured{'\n'}
              ✅ EAS channels set up{'\n\n'}
              ⚠️ Replace [your-project-id] in app.json
            </Text>
          </GlassView>

          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  stepCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  commandBox: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  commandText: {
    fontFamily: 'monospace',
    fontSize: 13,
  },
  notesSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  notesHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  noteText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  configCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  configTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  configText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'monospace',
  },
  bottomPadding: {
    height: 40,
  },
});
