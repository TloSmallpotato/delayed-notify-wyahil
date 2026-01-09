
import { GlassView } from 'expo-glass-effect';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Stack, router } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  highlightBox: {
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '500',
  },
  linkButton: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningBox: {
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
  },
  warningText: {
    fontSize: 13,
    fontWeight: '500',
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
    marginLeft: 8,
  },
});

export default function OTAInfoScreen() {
  const { colors } = useTheme();

  const openExpoWebsite = () => {
    Linking.openURL('https://expo.dev');
  };

  const openEASUpdateDocs = () => {
    Linking.openURL('https://docs.expo.dev/eas-update/introduction/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.card }]}
        onPress={() => router.back()}
      >
        <IconSymbol
          ios_icon_name="chevron.left"
          android_material_icon_name="arrow-back"
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            OTA Updates Guide
          </Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Push updates without app store review
          </Text>
        </View>

        {/* What is OTA */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            What are OTA Updates?
          </Text>
          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.cardText, { color: colors.text }]}>
              Over-The-Air (OTA) updates let you push JavaScript, styling, and asset changes directly to users without going through the App Store or Play Store review process.
            </Text>
            <View style={[styles.highlightBox, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.highlightText, { color: colors.primary }]}>
                ✨ Updates happen automatically when users open your app!
              </Text>
            </View>
          </GlassView>
        </View>

        {/* Answer to User's Question */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Use Expo Dashboard (No Local Commands!)
          </Text>
          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              ✅ Recommended: Expo EAS Update
            </Text>
            <Text style={[styles.cardText, { color: colors.text }]}>
              Your app is already configured with expo-updates. You can publish OTA updates directly from the Expo dashboard at expo.dev without running any commands locally.
            </Text>
          </GlassView>

          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              ❌ Not Natively
            </Text>
            <Text style={[styles.cardText, { color: colors.text }]}>
              Natively is for building and previewing your app. For OTA updates, use Expo's EAS Update service which is designed specifically for this purpose.
            </Text>
          </GlassView>
        </View>

        {/* Step by Step */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            How to Publish OTA Updates
          </Text>

          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.stepNumber, { color: colors.primary }]}>
              Step 1: Push Code to GitHub
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Commit and push your changes to your GitHub repository. This is the only local action you need to take.
            </Text>
          </GlassView>

          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.stepNumber, { color: colors.primary }]}>
              Step 2: Go to Expo Dashboard
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Visit expo.dev and sign in to your account. Navigate to your project.
            </Text>
          </GlassView>

          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.stepNumber, { color: colors.primary }]}>
              Step 3: Navigate to Updates
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              In your project dashboard, click on the "Updates" tab in the left sidebar.
            </Text>
          </GlassView>

          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.stepNumber, { color: colors.primary }]}>
              Step 4: Publish Update
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              Click the "Publish" button to create a new OTA update. Select your branch and channel, then publish.
            </Text>
          </GlassView>

          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.stepNumber, { color: colors.primary }]}>
              Step 5: Users Get Updates Automatically
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              When users open your app, it will automatically check for and download the update. The update applies on the next app launch.
            </Text>
          </GlassView>
        </View>

        {/* What Can Be Updated */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            What Can Be Updated via OTA?
          </Text>
          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              ✅ Can Update:
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • JavaScript code changes
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • React components and logic
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • Styling and layouts
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • Images and assets
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • Bug fixes and minor features
            </Text>
          </GlassView>

          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              ❌ Cannot Update (Requires New Build):
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • Native code changes
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • New native dependencies
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • app.json configuration changes
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • Permissions or entitlements
            </Text>
            <Text style={[styles.bulletPoint, { color: colors.text }]}>
              • SDK version upgrades
            </Text>
          </GlassView>
        </View>

        {/* Your App Configuration */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your App Configuration
          </Text>
          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.cardText, { color: colors.text }]}>
              Your app.json already has the correct configuration for OTA updates:
            </Text>
            <View style={[styles.warningBox, { backgroundColor: colors.card, borderColor: colors.primary }]}>
              <Text style={[styles.warningText, { color: colors.text, fontFamily: 'monospace' }]}>
                "updates": {'{'}
              </Text>
              <Text style={[styles.warningText, { color: colors.text, fontFamily: 'monospace', marginLeft: 16 }]}>
                "url": "https://u.expo.dev/..."
              </Text>
              <Text style={[styles.warningText, { color: colors.text, fontFamily: 'monospace' }]}>
                {'}'}
              </Text>
            </View>
            <Text style={[styles.cardText, { color: colors.text, marginTop: 12 }]}>
              This means your app is ready to receive OTA updates!
            </Text>
          </GlassView>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Links
          </Text>

          <TouchableOpacity onPress={openExpoWebsite}>
            <GlassView style={styles.linkButton} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
              <Text style={[styles.linkButtonText, { color: colors.primary }]}>
                Open Expo Dashboard
              </Text>
              <IconSymbol
                ios_icon_name="arrow.up.right"
                android_material_icon_name="open-in-new"
                size={20}
                color={colors.primary}
              />
            </GlassView>
          </TouchableOpacity>

          <TouchableOpacity onPress={openEASUpdateDocs}>
            <GlassView style={styles.linkButton} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
              <Text style={[styles.linkButtonText, { color: colors.primary }]}>
                EAS Update Documentation
              </Text>
              <IconSymbol
                ios_icon_name="arrow.up.right"
                android_material_icon_name="open-in-new"
                size={20}
                color={colors.primary}
              />
            </GlassView>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <GlassView style={styles.card} tint={colors.card === '#1c1c1e' ? 'dark' : 'light'}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              📝 Summary
            </Text>
            <Text style={[styles.cardText, { color: colors.text }]}>
              You don't need to run any commands locally! Just push your code to GitHub, then use the Expo dashboard at expo.dev to publish OTA updates. Your users will automatically receive the updates when they open the app.
            </Text>
          </GlassView>
        </View>
      </ScrollView>
    </View>
  );
}
