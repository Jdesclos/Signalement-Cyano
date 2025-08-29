
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SignalementCard from '../components/SignalementCard';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';

import { COLORS, COMMON_STYLES } from '../styles/theme';

interface Signalement {
  id: string;
  description: string;
  image?: string;
  location?: { latitude: number; longitude: number };
  createdAt?: any;
}

export default function SignalementsList() {
  const [signalements, setSignalements] = useState<Signalement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignalements = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const q = query(collection(db, 'signalements'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data: Signalement[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Signalement[];
        setSignalements(data);
      } catch (e) {
        setSignalements([]);
      }
      setLoading(false);
    };
    fetchSignalements();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color={COLORS.primary} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={[styles.container, COMMON_STYLES.centered as import('react-native').ViewStyle]} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Liste des signalements</Text>
          <FlatList
            data={signalements}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <SignalementCard
                description={item.description}
                image={item.image}
                location={item.location}
                createdAt={item.createdAt}
                style={{ maxWidth: '100%', flexShrink: 1 }}
              />
            )}
            ListEmptyComponent={<Text style={[styles.emptyText, { maxWidth: '100%', flexShrink: 1 }]}>Aucun signalement pour l'instant.</Text>}
            style={{ maxWidth: '100%', flexShrink: 1 }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: COLORS.primary,
  },
  emptyText: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 20,
  },
  // Styles de la carte déplacés dans le composant SignalementCard
});
