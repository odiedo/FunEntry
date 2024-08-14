import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoadingAnimation = () => {
    // Create a ref to hold the animated value for rotation
    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the rotation animation
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateValue]);

    // create a 360-degree rotation
    const rotateAnimation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.spinner, { transform: [{ rotate: rotateAnimation }] }]}>
                <Icon name="sync" size={50} color="#4A90E2" />
            </Animated.View>
            <Text style={styles.text}>Encrypting data...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    spinner: {
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#555',
    },
});

export default LoadingAnimation;
