import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/logo/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.companyName}>Fun-Corp Developers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  companyName: {
    fontSize: 16,
    color: '#4A90E2',
    position: 'absolute',
    bottom: 3,
    fontWeight: 'bold'
  },
});

export default SplashScreen;
