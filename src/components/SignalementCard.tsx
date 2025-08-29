import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { ViewStyle } from 'react-native';
interface SignalementCardProps {
  description: string;
  image?: string;
  location?: { latitude: number; longitude: number };
  createdAt?: any;
  style?: ViewStyle;
}

export default function SignalementCard({ description, image, location, createdAt, style }: SignalementCardProps) {
  return (
    <View style={[styles.card, style]}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.desc}>{description}</Text>
      {location && (
        <Text style={styles.loc}>
          📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}
      {createdAt && (
        <Text style={styles.date}>
          {new Date(createdAt.seconds * 1000).toLocaleString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    marginBottom: 6,
  },
  loc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});
