import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Image, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
const ParentsInfoScreen = ({ route, navigation }) => {
    // accessing the parent status from navigation
    const { parentStatus } = route.params;
    const [fatherFrontIdPhoto, setFrontFatherIdPhoto] = useState(null);
    const [fatherBackIdPhoto, setBackFatherIdPhoto] = useState(null);
    const [motherFrontIdPhoto, setMotherFrontIdPhoto] = useState(null);
    const [motherBackIdPhoto, setMotherBackIdPhoto] = useState(null);


    const handleCapture = async (setImage) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('sorry, we need camera permission to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 4, 3],
            quality: 1
        });

        if (!result.canceled) {
            console.log('Image URI: ', result.assets[0].uri)
            setImage({ uri: result.assets[0].uri });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>B: Parents Information</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <FontAwesome name="times-circle" size={24} color='#fff' />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {parentStatus !== 'single_parent' && (
                    <View style={styles.fieldsContainer}>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Father's name</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Festus Etyang Emuria"
                                    placeholderTextColor="lightgrey"
                                />
                            </View>
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>ID Number</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="4239489"
                                    placeholderTextColor="lightgrey"
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>
                        <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Father ID Photo</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                                <Text style={styles.imageId}>Front ID</Text>
                                {!fatherFrontIdPhoto ? (
                                        <TouchableOpacity onPress={() => handleCapture(setFrontFatherIdPhoto)}>
                                            <FontAwesome name='camera' size={35} color="#4A90E2" />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => handleCapture(setFrontFatherIdPhoto)}>
                                            <Image source={fatherFrontIdPhoto} style={styles.idPreview}/>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            <View>
                                <Text style={styles.imageId}>Back ID</Text>

                                {!fatherBackIdPhoto ? (
                                        <TouchableOpacity onPress={() => handleCapture(setBackFatherIdPhoto)}>
                                            <FontAwesome name='camera' size={35} color="#4A90E2" />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => handleCapture(fatherBackIdPhoto)}>
                                            <Image source={fatherBackIdPhoto} style={styles.idPreview}/>
                                        </TouchableOpacity>
                                    )
                                }
                                
                            </View>
                            <View>
                                <Text style={styles.imageId}>No ID</Text>
                                <TouchableOpacity>
                                    <FontAwesome name='eye-slash' size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                )}

                {/* Mother Section */}
                <View style={styles.fieldsContainer}>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Mother's name</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Ann Nafula"
                                placeholderTextColor="lightgrey"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Mother's ID Number</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="2789283"
                                placeholderTextColor="lightgrey"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Father ID Photo</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                                <Text style={styles.imageId}>Front ID</Text>
                                {!motherFrontIdPhoto ? (
                                    <TouchableOpacity onPress={() => handleCapture(setMotherFrontIdPhoto)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleCapture(setMotherFrontIdPhoto)}>
                                        <Image source={motherFrontIdPhoto} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                                }
                            </View>
                            <View>
                                <Text style={styles.imageId}>Back ID</Text>
                                {!motherBackIdPhoto ? (
                                        <TouchableOpacity onPress={() => handleCapture(setMotherBackIdPhoto)}>
                                            <FontAwesome name='camera' size={35} color="#4A90E2" />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => handleCapture(setMotherBackIdPhoto)}>
                                            <Image source={motherBackIdPhoto} style={styles.idPreview}/>
                                        </TouchableOpacity>
                                    ) 
                                }
                            </View>
                            <View>
                                <Text style={styles.imageId}>No ID</Text>
                                <TouchableOpacity>
                                    <FontAwesome name='eye-slash' size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Applicant Phone number</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="0712022132"
                                placeholderTextColor="lightgrey"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('FinalInfo')}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 30,
        backgroundColor: '#4A90E2',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flexGrow: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
        paddingTop: 30,
    },
    fieldsContainer: {
        width: '80%',
        alignItems: 'center',
    },
    fieldset: {
        marginBottom: 12,
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
        paddingHorizontal: 8,
        fontSize: 16,
        color: '#4A90E2',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 1,
        width: '100%',
    },
    fieldsetPhoto: {
        width: '100%',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#4A90E2',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputContainerPhoto: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    idPreview: {
        width: 70,
        height: 70,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 1,
    }, 
    input: {
        flex: 1,
        height: 50,
        width: '90%',
        padding: 0,
        color: '#333333',
    },
    footer: {
        width: '100%',
        height: 60,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingHorizontal: 20,
        paddingVertical: 1,
    },
    backButton: {
        backgroundColor: '#EEE',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    backButtonText: {
        color: '#4A90E2',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default ParentsInfoScreen;
