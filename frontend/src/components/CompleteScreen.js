import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const CompleteScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ ...styles.animationContainer, opacity: fadeAnim }}>
                <Text style={styles.emoji}>🎉</Text>
                <Text style={styles.successText}>Entry Successful!</Text>
            </Animated.View>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    animationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 80,
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginVertical: 20,
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#4A90E2',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default CompleteScreen;
