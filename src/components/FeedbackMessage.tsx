import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FeedbackMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export default function FeedbackMessage({ message, type = 'info' }: FeedbackMessageProps) {
  const color = type === 'success' ? '#388e3c' : type === 'error' ? '#d32f2f' : '#1976d2';
  return (
    <View style={[styles.container, { borderColor: color }]}> 
      <Text style={[styles.text, { color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
