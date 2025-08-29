
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderNature from '../components/HeaderNature';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, COMMON_STYLES } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  const handleConsult = () => {
    navigation.navigate('SignalementsList');
  };
  const handlePublish = () => {
    navigation.navigate('ReportForm');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleLogout = async () => {
    await signOut(auth);
    setLoggedIn(false);
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, COMMON_STYLES.centered as import('react-native').ViewStyle]}>
      <HeaderNature />
      <PrimaryButton
        title="🔎 Consulter les signalements"
        color={COLORS.secondary}
        onPress={handleConsult}
        style={[styles.consultBtn, COMMON_STYLES.shadow, { maxWidth: '100%', flexShrink: 1 }]}
      />
      {!loggedIn && (
        <>
          <View style={styles.authBlock}>
            <Text style={styles.info}>Connecte-toi pour publier un signalement.</Text>
          </View>
          <PrimaryButton
            title="Se connecter"
            color={COLORS.primary}
            onPress={handleLogin}
            style={[styles.publishBtn, COMMON_STYLES.shadow, { maxWidth: '100%', flexShrink: 1 }]}
          />
        </>
      )}
      {loggedIn && (
        <>
          <PrimaryButton
            title="🐾 Publier un signalement"
            onPress={handlePublish}
            style={[styles.publishBtn, COMMON_STYLES.shadow, { maxWidth: '100%', flexShrink: 1 }]}
          />
          <PrimaryButton
            title="Se déconnecter"
            color={COLORS.error}
            onPress={handleLogout}
            style={[styles.logoutBtn, COMMON_STYLES.shadow, { maxWidth: '100%', flexShrink: 1 }]}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  consultBtn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 18,
    alignItems: 'center',
  },
  publishBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 18,
    alignItems: 'center',
  },
  authBlock: {
    marginTop: 18,
    alignItems: 'center',
  },
  info: {
    marginVertical: 20,
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  logoutBtn: {
    backgroundColor: COLORS.error,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 4,
  },
});
