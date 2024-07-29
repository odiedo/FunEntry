import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const StudentScreen = ({ navigation }) => {
    const [selectedStatus, setSelectedStatus] = useState('');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            <View style={styles.header}>
                <Text style={styles.headerText}>A: Student Information</Text>
                <FontAwesome name="times-circle" size={24} color='#fff' />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.fieldsContainer}>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Full name</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="jane doe"
                                placeholderTextColor="lightgrey"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Adm no</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="be/00622/2023"
                                placeholderTextColor="lightgrey"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>School</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="be/00622/2023"
                                placeholderTextColor="lightgrey"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Form / Class</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="be/00622/2023"
                                placeholderTextColor="lightgrey"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Birth Certificate no</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="be/00622/2023"
                                placeholderTextColor="lightgrey"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Fee Balance</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="be/00622/2023"
                                placeholderTextColor="lightgrey"
                            />
                        </View>
                    </View>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Parent Status</Text>
                        <View style={styles.inputContainer}>
                            <Picker
                                selectedValue={selectedStatus}
                                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                                style={styles.input}
                            >
                                <Picker.Item label='Needy' value="needy" />
                                <Picker.Item label='Partial Orphan' value="partial_orphan" />
                                <Picker.Item label='Total Orphan' value="total_orphan" />
                                <Picker.Item label='Single Parent' value="single_parent" />
                            </Picker>
                        </View>
                    </View>
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
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('ParentsInfo')} >
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

export default StudentScreen;
