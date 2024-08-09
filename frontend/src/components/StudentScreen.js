import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, FlatList, VirtualizedList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { debounce } from 'lodash';

const schools = [
    "Kolanya Boys High School",
    "Kolanya Girls High School",
    "Moi High School",
    "Lenana School",
    "Tigania Boys School",
    "St. Marys School",
];

const StudentScreen = ({ navigation }) => {
    const [selectedParentStatus, setSelectedParentStatus] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [inputSchool, setInputSchool] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [admNo, setAdmNo] = useState('');
    const [formClass, setFormClass] = useState('');
    const [feeBalance, setFeeBalance] = useState('');

    const handleInputChange = (text) => {
        setInputSchool(text);
        filterSchools(text);
    };

    const filterSchools = useCallback(
        debounce((text) => {
            if (text) {
                const filtered = schools.filter((school) =>
                    school.toLowerCase().includes(text.toLowerCase())
                );
                setFilteredSchools(filtered);
            } else {
                setFilteredSchools([]);
            }
        }, 300),
        []
    );

    const handleSchoolSelect = (school) => {
        setInputSchool(school);
        setFilteredSchools([]);
    };

    const handleNext = () => {
        navigation.navigate('ParentsInfo', {
            studentName,
            admNo,
            inputSchool,
            selectedGender,
            selectedLevel,
            formClass,
            feeBalance,
            selectedParentStatus
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>A: Student Information</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <FontAwesome name="times-circle" size={24} color='#fff' />
                </TouchableOpacity>
            </View>
            <VirtualizedList
                data={[]}
                getItemCount={() => 1}
                getItem={(data, index) => ({ key: 'main' })}
                renderItem={() => (
                    <View style={styles.fieldsContainer}>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Full name</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Jane Doe"
                                    placeholderTextColor="lightgrey"
                                    value={studentName}
                                    onChangeText={setStudentName}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Gender</Text>
                            <View style={styles.inputContainer}>
                                <Picker 
                                    selectedValue={selectedGender}
                                    onValueChange={(itemValue) => setSelectedGender(itemValue)}
                                    style={styles.input}
                                >
                                    <Picker.Item label='--- Select Gender ---' />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Adm no</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="1427"
                                    placeholderTextColor="lightgrey"
                                    value={admNo}
                                    onChangeText={setAdmNo}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Education Level</Text>
                            <View style={styles.inputContainer}>
                                <Picker
                                selectedValue={selectedLevel}
                                onValueChange={(itemValue) => setSelectedLevel(itemValue)} 
                                style={styles.input}
                                >
                                    <Picker.Item label='--- Select Level ---' />
                                    <Picker.Item label="Secondary" value="secondary" />
                                    <Picker.Item label="Tertiary" value="tertiary" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>School</Text>
                            <View style={styles.inputContainerSch}>
                                <TextInput
                                    style={styles.inputSch}
                                    placeholder="Kolanya Boys High School"
                                    placeholderTextColor="lightgrey"
                                    value={inputSchool}
                                    onChangeText={handleInputChange}
                                />
                            </View>
                            {filteredSchools.length > 0 && (
                                    <FlatList
                                        data={filteredSchools}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => handleSchoolSelect(item)}>
                                                <Text style={styles.suggestion}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        style={styles.suggestionsContainer}
                                        keyboardShouldPersistTaps="handled"
                                    />
                                )}
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Form / Class</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="4"
                                    placeholderTextColor="lightgrey"
                                    keyboardType="phone-pad"
                                    value={formClass}
                                    onChangeText={setFormClass}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Fee Balance</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="1200"
                                    placeholderTextColor="lightgrey"
                                    keyboardType="phone-pad"
                                    value={feeBalance}
                                    onChangeText={setFeeBalance}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldset}>
                            <Text style={styles.legend}>Parent Status</Text>
                            <View style={styles.inputContainer}>
                                <Picker
                                    selectedValue={selectedParentStatus}
                                    onValueChange={(itemValue) => setSelectedParentStatus(itemValue)}
                                    style={styles.input}
                                >
                                    <Picker.Item label='--- Select Status ---' />
                                    <Picker.Item label='Needy' value="needy" />
                                    <Picker.Item label='Partial Orphan' value="partial_orphan" />
                                    <Picker.Item label='Total Orphan' value="total_orphan" />
                                    <Picker.Item label='Single Parent' value="single_parent" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.scrollContainer}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext} >
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
    inputContainerSch: {
        flexDirection: 'row',
        alignItems: 'center',
         width: '100%',
    },
    inputSch: {
        flex: 1,
        height: 50,
        width: '90%',
        padding: 0,
        color: '#333333',
    },
    suggestionsContainer: {
        position: 'relative',
        width: '100wh',
        backgroundColor: '#fff',
        zIndex: 1,
        maxHeight: 130,
        paddingVertical: 10,
    },
    suggestion: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
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
