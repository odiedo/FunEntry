import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fun Entry</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#6a6a6a"
          />
          <Image
            source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/new-post.png' }}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#6a6a6a"
          />
          <Image
            source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/lock-2.png' }}
            style={styles.icon}
          />
        </View>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          Not have account? {"\n"}  <Text style={styles.signupLink}>Signup here</Text>
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
    left:0,
    width: '80%',
    height: '40%',
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius:100,
    borderTopRightRadius: 200,
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
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
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
