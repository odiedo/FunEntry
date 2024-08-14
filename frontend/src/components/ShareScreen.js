import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { getToken } from '../utils/auth';

const ShareScreen = () => {
  const shareData = async () => {
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

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Text>Press the button to share data:</Text>
      <Button title="Share Data" onPress={shareData} />
    </View>
  );
};

export default ShareScreen;
