import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getToken } from '../utils/auth';
import LoadingAnimation from './LoadingAnimation';

const ShareScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const shareData = async () => {
    setIsLoading(true);
    const token = await getToken();
    try {
      const response = await fetch('http://192.168.100.16:5000/api/share-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      console.log(response); 

      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.error || 'Something went wrong');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };
  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.shareBox}>
        <TouchableOpacity style={styles.shareButton} onPress={shareData}>
          <FontAwesome name='cloud-upload' size={60} color="#4A90E2" />
          <Text style={styles.shareText}>Share Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  shareBox: {
    paddingVertical: '80%',
    alignItems: 'center',
  },
  shareButton: {
    width: 150,
    paddingVertical: 40,
    backgroundColor: '#0000',
    alignItems: 'center',
    
  },
  shareText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ShareScreen;
