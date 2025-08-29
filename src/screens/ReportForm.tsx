import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import HeaderNature from '../components/HeaderNature';
import PrimaryButton from '../components/PrimaryButton';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { getFirestore, addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';
import { COLORS } from '../styles/theme';

// Composant principal du formulaire de signalement
export default function ReportForm() {
  const [title, setTitle] = useState('');
  const [milieu, setMilieu] = useState('Lac');
  const [waterName, setWaterName] = useState('');
  const [commune, setCommune] = useState('');
  const [departement, setDepartement] = useState('');
  const [observationDate, setObservationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState('');
  const [animaux, setAnimaux] = useState('Non');
  const [animauxPrecisions, setAnimauxPrecisions] = useState('');
  const [activites, setActivites] = useState('');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userSignalementsCount, setUserSignalementsCount] = useState<number | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setUserDisplayName(auth.currentUser.displayName || auth.currentUser.email || 'Utilisateur');
      const fetchCount = async () => {
        try {
          const db = getFirestore(app);
          const q = collection(db, 'signalements');
          const snapshot = await getDocs(q);
          const userId = auth.currentUser?.uid;
          const count = snapshot.docs.filter(doc => doc.data().user === userId).length;
          setUserSignalementsCount(count);
        } catch {
          setUserSignalementsCount(null);
        }
      };
      fetchCount();
    }
  }, []);

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLoading(false);
      Alert.alert('Permission requise', 'La permission de géolocalisation est nécessaire.');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!title || !milieu || !waterName || !commune || !departement || !description || !location) {
      Alert.alert('Champs manquants', 'Merci de remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    try {
      const db = getFirestore(app);
      await addDoc(collection(db, 'signalements'), {
        title,
        milieu,
        waterName,
        commune,
        departement,
        observationDate: observationDate.toISOString(),
        description,
        animaux,
        animauxPrecisions: animaux === 'Oui' ? animauxPrecisions : '',
        activites,
        location,
        createdAt: serverTimestamp(),
        user: auth.currentUser ? auth.currentUser.uid : null,
      });

      Alert.alert('Signalement envoyé', 'Merci pour ta contribution !');
      setTitle('');
      setMilieu('Lac');
      setWaterName('');
      setCommune('');
      setDepartement('');
      setObservationDate(new Date());
      setDescription('');
      setAnimaux('Non');
      setAnimauxPrecisions('');
      setActivites('');
      setLocation(null);
    } catch (e) {
      Alert.alert('Erreur', "Impossible d'envoyer le signalement. Vérifie ta connexion.");
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <HeaderNature />
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Connecté en tant que : {userDisplayName}</Text>
        {userSignalementsCount !== null && (
          <Text style={styles.userInfoText}>Nombre de signalements : {userSignalementsCount}</Text>
        )}
      </View>
      <Text style={styles.label}>Titre du signalement *</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre (ex: Eau verte, mousse...)"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={COLORS.accent}
      />
      <Text style={styles.label}>Type de milieu *</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={milieu}
          onValueChange={setMilieu}
          style={styles.picker}
        >
          <Picker.Item label="Lac" value="Lac" />
          <Picker.Item label="Rivière" value="Rivière" />
          <Picker.Item label="Étang" value="Étang" />
          <Picker.Item label="Mer" value="Mer" />
          <Picker.Item label="Autre" value="Autre" />
        </Picker>
      </View>
      <Text style={styles.label}>Nom du plan d'eau *</Text>
      <TextInput
        style={styles.input}
        placeholder="Lac, rivière, étang..."
        value={waterName}
        onChangeText={setWaterName}
        placeholderTextColor={COLORS.accent}
      />
      <Text style={styles.label}>Commune *</Text>
      <TextInput
        style={styles.input}
        placeholder="Commune"
        value={commune}
        onChangeText={setCommune}
        placeholderTextColor={COLORS.accent}
      />
      <Text style={styles.label}>Département *</Text>
      <TextInput
        style={styles.input}
        placeholder="Département"
        value={departement}
        onChangeText={setDepartement}
        placeholderTextColor={COLORS.accent}
      />
      <Text style={styles.label}>Coordonnées GPS *</Text>
      <TouchableOpacity onPress={getLocation} style={styles.gpsBtn}>
        <Text style={styles.dateBtnText}>{location ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}` : '📍 Obtenir la géolocalisation'}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Date/heure d'observation *</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateBtn}>
        <Text style={styles.dateBtnText}>🗓️ {observationDate.toLocaleString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={observationDate}
          mode="datetime"
          display="default"
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) setObservationDate(date);
          }}
        />
      )}
      <Text style={styles.label}>Description de l'observation *</Text>
      <TextInput
        style={styles.input}
        placeholder="Couleur, odeur, aspect, mousse, mortalité de poissons..."
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor={COLORS.accent}
      />
      <Text style={styles.label}>Animaux morts ou malades observés ? *</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={animaux}
          onValueChange={setAnimaux}
          style={styles.picker}
        >
          <Picker.Item label="Non" value="Non" />
          <Picker.Item label="Oui" value="Oui" />
        </Picker>
      </View>
      {animaux === 'Oui' && (
        <TextInput
          style={styles.input}
          placeholder="Précisez (espèce, nombre, etc.)"
          onChangeText={setAnimauxPrecisions}
          placeholderTextColor={COLORS.accent}
        />
      )}
      <Text style={styles.label}>Activités à proximité</Text>
      <TextInput
        style={styles.input}
        placeholder="Baignade, pêche, sports nautiques, etc. (facultatif)"
        value={activites}
        onChangeText={setActivites}
        placeholderTextColor={COLORS.accent}
      />
      {loading && <ActivityIndicator style={{ marginVertical: 10 }} color={COLORS.primary} />}
      <PrimaryButton title="🐾 Envoyer le signalement" onPress={handleSubmit} style={styles.submitBtn} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  headerNature: {
    alignItems: 'center',
    marginBottom: 18,
  },
  dogIcon: {
    width: 54,
    height: 54,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 8,
  },
  userInfo: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
  userInfoText: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 2,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 15,
    color: COLORS.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    minHeight: 40,
    textAlignVertical: 'top',
    backgroundColor: COLORS.light,
    fontSize: 15,
    color: COLORS.text,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: COLORS.light,
  },
  picker: {
    height: 40,
    width: '100%',
    color: COLORS.primary,
  },
  gpsBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },
  dateBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },
  dateBtnText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  suggestionList: {
    backgroundColor: '#fff',
    borderColor: COLORS.accent,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 180,
    marginBottom: 8,
    zIndex: 10,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
