import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderNatureProps {
  title?: string;
  subtitle?: string;
}

export default function HeaderNature({ title = 'Signalement Cyano', subtitle = 'Nature, eau, animaux : protégeons-les !' }: HeaderNatureProps) {
  return (
    <View style={styles.headerNature}>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }} style={styles.dogIcon} />
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: '#388e3c',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#388e3c',
    marginBottom: 8,
  },
});
