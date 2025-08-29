import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import PrimaryButton from '../components/PrimaryButton';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { COLORS, COMMON_STYLES } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Champs requis',
        text2: 'Merci de remplir tous les champs.'
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Connexion réussie',
        text2: 'Bienvenue !'
      });
      navigation.replace('Home');
    } catch (error: any) {
      let message = 'Erreur de connexion.';
      if (error.code === 'auth/user-not-found') message = "Utilisateur non trouvé.";
      else if (error.code === 'auth/wrong-password') message = "Mot de passe incorrect.";
      else if (error.code === 'auth/invalid-email') message = "Email invalide.";
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: message
      });
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Champs requis',
        text2: 'Merci de remplir tous les champs.'
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Succès',
        text2: 'Compte créé, vous pouvez vous connecter.'
      });
      setIsRegister(false);
    } catch (error: any) {
      let message = 'Erreur lors de la création du compte.';
      if (error.code === 'auth/email-already-in-use') message = "Email déjà utilisé.";
      else if (error.code === 'auth/invalid-email') message = "Email invalide.";
      else if (error.code === 'auth/weak-password') message = "Mot de passe trop faible (6 caractères min).";
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: message
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={[styles.container, COMMON_STYLES.centered as import('react-native').ViewStyle]} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{isRegister ? 'Créer un compte' : 'Connexion'}</Text>
          <TextInput
            style={[styles.input, { maxWidth: '100%', flexShrink: 1 }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={COLORS.accent}
          />
          <TextInput
            style={[styles.input, { maxWidth: '100%', flexShrink: 1 }]}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={COLORS.accent}
          />
          {isRegister ? (
            <>
              <PrimaryButton title="Créer le compte" onPress={handleRegister} style={{ maxWidth: '100%', flexShrink: 1 }} />
              <PrimaryButton title="J'ai déjà un compte" color={COLORS.secondary} onPress={() => setIsRegister(false)} style={{ maxWidth: '100%', flexShrink: 1 }} />
            </>
          ) : (
            <>
              <PrimaryButton title="Se connecter" onPress={handleLogin} style={{ maxWidth: '100%', flexShrink: 1 }} />
              <PrimaryButton title="Créer un compte" color={COLORS.secondary} onPress={() => setIsRegister(true)} style={{ maxWidth: '100%', flexShrink: 1 }} />
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.primary,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: COLORS.light,
    color: COLORS.text,
    fontSize: 16,
  },
});
