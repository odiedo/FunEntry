import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { getToken } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FinalInfoScreen = ({ route, navigation }) => {

    const { studentName, admNo, selectedGender, selectedLevel, inputSchool, formClass, feeBalance, selectedParentStatus, fatherName, fatherIdNumber, fatherFrontIdPhoto, fatherBackIdPhoto, fatherNoId, motherName, motherIdNumber, motherFrontIdPhoto, motherBackIdPhoto, motherNoId, applicantPhoneNumber } = route.params
    const [feeStructure, setFeeStructure] = useState(null);
    const [resultSlip, setResultSlip] = useState(null);
    const [birthCert, setBirthCert] = useState(null);
    const [disableCert, setDisableCert] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [birthCertNo, setBirthCertNo] = useState('');
    const [noBirthCert, setNoBirthCert] = useState(false);
    const [noTranscript, setNoTranscript] = useState(false);
    const [noFeeStructure, setNoFeeStructure] = useState(false);
    useEffect(() =>{
        initializeSummaryData();
    }, []);

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


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('studentName', studentName);
        formData.append('admNo', admNo);
        formData.append('selectedGender', selectedGender);
        formData.append('selectedLevel', selectedLevel);
        formData.append('inputSchool', inputSchool);
        formData.append('formClass', formClass);
        formData.append('feeBalance', feeBalance);
        formData.append('selectedParentStatus', selectedParentStatus);
        if (fatherFrontIdPhoto && fatherFrontIdPhoto.uri) {
            formData.append('fatherFrontIdPhoto', {
                uri: fatherFrontIdPhoto.uri,
                name: 'fatherFrontIdPhoto.jpg',
                type: 'image/jpeg',
            });
        }
    
        if (fatherBackIdPhoto && fatherBackIdPhoto.uri) {
            formData.append('fatherBackIdPhoto', {
                uri: fatherBackIdPhoto.uri,
                name: 'fatherBackIdPhoto.jpg',
                type: 'image/jpeg',
            });
        }
        formData.append('motherFrontIdPhoto', {
            uri: motherFrontIdPhoto.uri,
            name: 'motherFrontIdPhoto.jpg',
            type: 'image/jpeg'
        });
        formData.append('motherBackIdPhoto', {
            uri: motherBackIdPhoto.uri,
            name: 'motherBackIdPhoto.jpg',
            type: 'image/jpeg'
        });
        formData.append('motherNoId', motherNoId);
        formData.append('fatherNoId', fatherNoId);
        formData.append('fatherName', fatherName);
        formData.append('fatherIdNumber', fatherIdNumber);
        formData.append('motherName', motherName);
        formData.append('motherIdNumber', motherIdNumber);
        formData.append('applicantPhoneNumber', applicantPhoneNumber);
    
        if (feeStructure) {
            formData.append('feeStructure', {
                uri: feeStructure.uri,
                name: 'feeStructure.jpg',
                type: 'image/jpeg'
            });
        }
    
        if (resultSlip) {
            formData.append('resultSlip', {
                uri: resultSlip.uri,
                name: 'resultSlip.jpg',
                type: 'image/jpeg'
            });
        }
    
        if (birthCert) {
            formData.append('birthCert', {
                uri: birthCert.uri,
                name: 'birthCert.jpg',
                type: 'image/jpeg'
            });
        }
    
        if (disableCert) {
            formData.append('disableCert', {
                uri: disableCert.uri,
                name: 'disableCert.jpg',
                type: 'image/jpeg'
            });
        }
    
        formData.append('birthCertNo', birthCertNo);
        formData.append('selectedStatus', selectedStatus);
        formData.append('noBirthCert', noBirthCert);
        formData.append('noTranscript', noTranscript);
        formData.append('noFeeStructure', noFeeStructure);

        try {
            const token = await getToken();
            
            const response = await fetch('http://192.168.100.16:5000/submit', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });
            if (response.ok) {
                await updateSummaryData(selectedLevel, selectedParentStatus, selectedStatus);
                alert('Form submitted successfully!');
                // navigation.navigate('Home');
            } else {
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };
    

            // data entry summary initialization
    const initializeSummaryData = async () => {
        const initialData = {
            tertiary: 0,
            secondary: 0,
            singleParents: 0,
            partialOrphans: 0,
            totalOrphans: 0,
            pwds: 0,
        };
        await AsyncStorage.setItem('summaryData', JSON.stringify(initialData));
    };

    const updateSummaryData = async (selectedLevel, selectedParentStatus, selectedStatus) => {
        const data = await AsyncStorage.getItem('summaryData');
        let summaryData = JSON.parse(data);

        if (selectedLevel === 'tertiary') {
            summaryData.tertiary += 1;
        } else if (selectedLevel === 'secondary') {
            summaryData.secondary += 1;
        }
        
        if (selectedParentStatus === 'single_parent') {
            summaryData.singleParents += 1;
        } else if (selectedParentStatus === 'partial_orphan') {
            summaryData.partialOrphans += 1;
        } else if (selectedParentStatus === 'total_orphans') {
            summaryData.totalOrphans += 1;
        }

        if (selectedStatus === 'yes') {
            summaryData.pwds += 1;
        }
        await AsyncStorage.setItem('summaryData', JSON.stringify(summaryData))
        
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
                                <Picker.Item label='--- Select Disability Status ---' value="" />
                                <Picker.Item label='No' value="no"/>
                                <Picker.Item label='Yes' value="yes" />
                            </Picker>
                        </View>
                        {selectedStatus === 'yes' && (
                            <View style={styles.fieldset}>
                                <Text style={styles.legendAtt}>Disability Certiicate</Text>
                                <Text style={styles.legendAtt}>Disability cert number</Text>
                                <View style={styles.conditionAtt}>
                                    {!disableCert ? (
                                            <TouchableOpacity onPress={() => handleCapture(setDisableCert)}>
                                                <FontAwesome name='camera' size={35} color="#4A90E2" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => handleCapture(setDisableCert)}>
                                                <Image source={disableCert} style={styles.idPreviewAtt}/>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Birth Certificate no</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="A3200F326"
                                placeholderTextColor="lightgrey"
                                value={birthCertNo}
                                onChangeText={setBirthCertNo}
                            />
                        </View>
                    </View>
                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Birth Certificate</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                            {!birthCert ? (
                                    <TouchableOpacity onPress={() => !noBirthCert && handleCapture(setBirthCert)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => !noBirthCert && handleCapture(setBirthCert)}>
                                        <Image source={birthCert} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                            }
                            </View>
                            <View>
                                <Text style={styles.imageId}>No certificate</Text>
                                <TouchableOpacity onPress={() => setNoBirthCert(!noBirthCert)}>
                                    <FontAwesome name={noBirthCert ? 'check-circle-o' : 'circle-o'} size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Fee Structure</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                            {!feeStructure ? (
                                    <TouchableOpacity onPress={() => !noFeeStructure && handleCapture(setFeeStructure)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => !noFeeStructure && handleCapture(setFeeStructure)}>
                                        <Image source={feeStructure} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                            }
                            </View>
                            <View>
                                <Text style={styles.imageId}>No fee form</Text>
                                <TouchableOpacity onPress={() => setNoFeeStructure(!noFeeStructure)}>
                                    <FontAwesome name={noFeeStructure ? 'check-circle-o' : 'circle-o'} size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldsetPhoto}>
                        <Text style={styles.legend}>Transcript / Results slip</Text>
                        <View style={styles.inputContainerPhoto}>
                            <View>
                            {!resultSlip ? (
                                    <TouchableOpacity onPress={() => !noTranscript && handleCapture(setResultSlip)}>
                                        <FontAwesome name='camera' size={35} color="#4A90E2" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => !noTranscript && handleCapture(setResultSlip)}>
                                        <Image source={resultSlip} style={styles.idPreview}/>
                                    </TouchableOpacity>
                                )
                            }
                            </View>
                            <View>
                                <Text style={styles.imageId}>No results</Text>
                                <TouchableOpacity onPress={() => setNoTranscript(!noTranscript)}>
                                    <FontAwesome name={noTranscript ? 'check-circle-o' : 'circle-o'} size={35} color="#4A90E2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={handleSubmit} >
                    <Text style={styles.nextButtonText}>Submit</Text>
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
    legendAtt: {
        textAlign: 'center',
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
    conditionAtt: {
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 10,
    },
    idPreviewAtt: {
        width: 70,
        height: 70,
        borderRadius: 10,
        paddingHorizontal: 10,
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
