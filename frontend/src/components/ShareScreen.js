import React, { useState } from 'react';
import { View, Button, Alert, Text } from 'react-native';
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
    <View style={{ margin: 20 }}>
      <Text>Press the button to share data:</Text>
      <Button title="Share Data" onPress={shareData} />
    </View>
  );
};

export default ShareScreen;
