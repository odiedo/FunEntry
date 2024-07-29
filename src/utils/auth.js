import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve the token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    console.error('Failed to fetch the token from storage', e);
  }
};