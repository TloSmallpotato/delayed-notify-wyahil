
import { GlassView } from 'expo-glass-effect';
import { useTheme } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { IconSymbol } from '@/components/IconSymbol';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  step: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    paddingLeft: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default function OTAInfoScreen() {
  const { colors } = useTheme();
  
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  const updateUrl = Constants.expoConfig?.updates?.url;
  const runtimeVersion = Constants.expoConfig?.runtimeVersion?.policy;
  const appVersion = Constants.expoConfig?.version;
  
  const isConfigured = projectId && projectId !== 'YOUR_PROJECT_ID_HERE';

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
          title: 'OTA Updates Setup',
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.scrollContent}>
        <Text style={[styles.header, { color: colors.text }]}>
          OTA Updates Configuration
        </Text>
        
        {/* Status Card */}
        <GlassView
          style={[styles.statusCard, { backgroundColor: colors.card + '40' }]}
          intensity={80}
        >
          <Text style={[styles.statusTitle, { color: colors.text }]}>
            Configuration Status
          </Text>
          
          <Text style={[styles.statusText, { color: colors.text }]}>
            Runtime Version: {runtimeVersion || 'Not set'}
          </Text>
          <Text style={[styles.statusText, { color: colors.text }]}>
            App Version: {appVersion || 'Not set'}
          </Text>
          <Text style={[styles.statusText, { color: colors.text }]}>
            Project ID: {isConfigured ? projectId : 'Not configured'}
          </Text>
          
          <View style={[
            styles.badge,
            { backgroundColor: isConfigured ? '#10b981' : '#f59e0b' }
          ]}>
            <Text style={[styles.badgeText, { color: '#ffffff' }]}>
              {isConfigured ? '✓ Ready for OTA' : '⚠ Setup Required'}
            </Text>
          </View>
        </GlassView>

        {/* Setup Instructions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📋 Setup Instructions
          </Text>
          
          {!isConfigured && (
            <>
              <Text style={[styles.text, { color: colors.text }]}>
                To complete OTA setup, follow these steps:
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                1. Go to expo.dev and sign in to your account
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                2. Find your project "Natively" in the dashboard
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                3. Copy the Project ID from the project settings
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                4. Replace "YOUR_PROJECT_ID_HERE" in app.json with your actual Project ID
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                5. Rebuild your app with the staging profile
              </Text>
            </>
          )}
          
          {isConfigured && (
            <>
              <Text style={[styles.text, { color: colors.text }]}>
                ✅ Your app is configured for OTA updates!
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                To publish an update to the staging channel:
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                1. Go to expo.dev → Your Project → Updates tab
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                2. Click "Publish Update"
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                3. Select the "staging" channel
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                4. Add a message describing your changes
              </Text>
              
              <Text style={[styles.step, { color: colors.text }]}>
                5. Click "Publish" - your update will be live in seconds!
              </Text>
            </>
          )}
        </View>

        {/* Channels Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📡 Available Channels
          </Text>
          
          <GlassView
            style={[styles.code, { backgroundColor: colors.card + '60' }]}
            intensity={60}
          >
            <Text style={{ color: colors.text, fontFamily: 'monospace' }}>
              • development - For testing{'\n'}
              • preview - For internal testing{'\n'}
              • staging - For pre-production ✓{'\n'}
              • production - For live users
            </Text>
          </GlassView>
          
          <Text style={[styles.text, { color: colors.text }]}>
            Your staging channel is ready to use! Build your app with the staging profile to start receiving OTA updates.
          </Text>
        </View>

        {/* Runtime Version Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🔄 Runtime Version Policy
          </Text>
          
          <Text style={[styles.text, { color: colors.text }]}>
            Your app uses the "appVersion" policy. This means:
          </Text>
          
          <Text style={[styles.step, { color: colors.text }]}>
            • OTA updates work within the same app version (currently {appVersion})
          </Text>
          
          <Text style={[styles.step, { color: colors.text }]}>
            • When you change the version in app.json, you need to rebuild the app
          </Text>
          
          <Text style={[styles.step, { color: colors.text }]}>
            • JavaScript and asset changes can be pushed via OTA
          </Text>
          
          <Text style={[styles.step, { color: colors.text }]}>
            • Native code changes require a new build
          </Text>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🔗 Quick Links
          </Text>
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={openExpoWebsite}
          >
            <IconSymbol
              ios_icon_name="globe"
              android_material_icon_name="language"
              size={20}
              color="#ffffff"
            />
            <Text style={[styles.buttonText, { color: '#ffffff' }]}>
              Open Expo Dashboard
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.card }]}
            onPress={openEASUpdateDocs}
          >
            <IconSymbol
              ios_icon_name="book"
              android_material_icon_name="menu-book"
              size={20}
              color={colors.text}
            />
            <Text style={[styles.buttonText, { color: colors.text }]}>
              Read EAS Update Docs
            </Text>
          </TouchableOpacity>
        </View>

        {/* Important Notes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            ⚠️ Important Notes
          </Text>
          
          <Text style={[styles.text, { color: colors.text }]}>
            • Always test updates on the staging channel before pushing to production
          </Text>
          
          <Text style={[styles.text, { color: colors.text }]}>
            • OTA updates are downloaded in the background and applied on next app restart
          </Text>
          
          <Text style={[styles.text, { color: colors.text }]}>
            • Users must have an internet connection to receive updates
          </Text>
          
          <Text style={[styles.text, { color: colors.text }]}>
            • You can roll back to previous updates from the Expo dashboard
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
