import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.11:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.access_token);
        
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{"\n"}Fun {"\n"}Entry</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.fieldset}>
          <Text style={styles.legend}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="odiedo@gmail.com"
              keyboardType="email-address"
              placeholderTextColor="#6a6a6a"
              value={email}
              onChangeText={setEmail}
            />
            <Image
              source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/new-post.png' }}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.fieldset}>
          <Text style={styles.legend}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="#6a6a6a"
              value={password}
              onChangeText={setPassword}
            />
            <Image
              source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/lock-2.png' }}
              style={styles.icon}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          Not have account? {"\n"}  
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
            <Text style={styles.signupLink}>Signup here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '30%',
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    width: '50%',
  },
  loginContainer: {
    width: '80%',
    marginTop: '50%',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 24,
    color: '#333333',
    fontWeight: '900',
    marginBottom: 20,
  },
  fieldset: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#4A90E2',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 1,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    width: '90%',
    padding: 0,
    color: '#333333',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#4A90E2',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signupText: {
    color: '#333333',
    marginTop: 20,
    textAlign: 'center',
  },
  signupLink: {
    color: '#4A90E2',
    textDecorationLine: 'none',
  },
});

export default LoginScreen;
