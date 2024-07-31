import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
const FinalInfoScreen = ({ navigation }) => {
    const [feeStructure, setFeeStructure] = useState(null);
    const [resultSlip, setResultSlip] = useState(null);
    const [proofNeed, setProofNeed] = useState(null);
    const [disableCert, setDisableCert] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
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
                <Text style={styles.headerText}>C: Attachment Information</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <FontAwesome name="times-circle" size={24} color='#fff' />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.fieldsContainer}>
                <View style={styles.fieldset}>
                        <Text style={styles.legend}>Disabled?</Text>
                        <View style={styles.inputContainer}>
                            <Picker
                                selectedValue={selectedStatus}
                                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                                style={styles.input}
                            >
                                <Picker.Item label='No' value="no" />
                                <Picker.Item label='Yes' value="yes" />
                            </Picker>
                        </View>
                    </View>
                    {!disableCert === 'yes' && (
                        <View>
                            {!disableCert ? (
                                    <TouchableOpacity onPress={() => handleCapture(setDisableCert)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleCapture(setDisableCert)}>
                                        <Image source={disableCert} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                            }
                            </View>
                    )}

                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Fee Structure</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                            {!feeStructure ? (
                                    <TouchableOpacity onPress={() => handleCapture(setFeeStructure)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleCapture(setFeeStructure)}>
                                        <Image source={feeStructure} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                            }
                            </View>
                            <View>
                                <Text style={styles.imageId}>No fee</Text>
                                <TouchableOpacity>
                                    <FontAwesome name='eye-slash' size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Academic Transcript / Results</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                            {!resultSlip ? (
                                    <TouchableOpacity onPress={() => handleCapture(setResultSlip)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleCapture(setResultSlip)}>
                                        <Image source={resultSlip} style={styles.idPreview}/>
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
                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Disability Certificate</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                            {!disableCert ? (
                                    <TouchableOpacity onPress={() => handleCapture(setDisableCert)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleCapture(setDisableCert)}>
                                        <Image source={disableCert} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                            }
                            </View>
                            <View>
                                <Text style={styles.imageId}>No cert</Text>
                                <TouchableOpacity>
                                    <FontAwesome name='eye-slash' size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Proof of need (if any)</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                            {!proofNeed ? (
                                    <TouchableOpacity onPress={() => handleCapture(setProofNeed)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handleCapture(setProofNeed)}>
                                        <Image source={proofNeed} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                            }
                            </View>
                            <View>
                                <Text style={styles.imageId}>No proof</Text>
                                <TouchableOpacity>
                                    <FontAwesome name='eye-slash' size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ParentsInfo')}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Complete')} >
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
    input: {
        flex: 1,
        height: 50,
        width: '90%',
        padding: 0,
        color: '#333333',
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

export default FinalInfoScreen;
