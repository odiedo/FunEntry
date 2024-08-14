import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios';
import { getToken } from '../utils/auth';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

  const [summaryData, setSummaryData] = useState ({
    tertiary: 0,
    secondary: 0,
    singleParents: 0,
    partialOrphans: 0,
    totalOrphans: 0,
    pwds: 0,
  });
  useEffect(() => {
    const fetchSummaryData = async () => {
      const data = await AsyncStorage.getItem('summaryData');
      if (data) {
        setSummaryData(JSON.parse(data))
      }
    };

    fetchSummaryData();
  }, []);

  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [locationData, setLocationData] = useState({
    ward: 'Malaba Central',
    location: 'Akadetewai',
    subLocation: 'Olobai', 
  });
  
  const [newLocationData, setNewLocationData] = useState({ ...locationData });
  const [locations, setLocations] = useState([]);
  const [subLocations, setSubLocations] = useState([]);

  const locationStructure = {
    "Malaba Central Ward": {
      locations: ["Akadetewai", "Machakusi"],
      subLocations: {
        "Akadetewai": ["Olobai", "Odoot", "Township"],
        "Machakusi": ["Amoni", "Machakusi"]
      } 
    },
    "Malaba North Ward": {
      locations: ["Kamuriai", "Osajai"],
      subLocations: {
        "Kamuriai": ["Kamuriai", "Okuleu"],
        "Osajai": ["Amukura", "Kiriko", "Chamasiri"]
      }
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://192.168.100.16:5000/user', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const selectedWard = newLocationData.ward;
    const selectedLocations = locationStructure[selectedWard]?.locations || [];
    const selectedSubLocations = locationStructure[selectedWard]?.subLocations[selectedLocations[0]] || [];

    setLocations(selectedLocations);
    setSubLocations(selectedSubLocations);
    setNewLocationData({
      ...newLocationData,
      location: selectedLocations[0] || '',
      subLocation: selectedSubLocations[0] || ''
    });
  }, [newLocationData.ward]);

  const handleLocationChange = (itemValue) => {
    const selectedSubLocations = locationStructure[newLocationData.ward]?.subLocations[itemValue] || [];
    setSubLocations(selectedSubLocations);
    setNewLocationData({
      ...newLocationData,
      location: itemValue,
      subLocation: selectedSubLocations[0] || ''
    });
  };

  const handleSaveLocation = () => {
    setLocationData(newLocationData);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
        <Text style={styles.headerText}>{username}</Text>
      </View>

      {/* Data Entry Summary Section */}
      <Text style={styles.funEntryText}>FunEntry</Text>
      <View style={styles.statisticsCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Tertiary Sch:</Text>
          <Text style={styles.statValue}>{summaryData.tertiary}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Secondary Sch:</Text>
          <Text style={styles.statValue}>{summaryData.secondary}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Single Parents:</Text>
          <Text style={styles.statValue}>{summaryData.singleParents}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Partial Orphans:</Text>
          <Text style={styles.statValue}>{summaryData.partialOrphans}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Orphans:</Text>
          <Text style={styles.statValue}>{summaryData.totalOrphans}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>PWDs:</Text>
          <Text style={styles.statValue}>{summaryData.pwds}</Text>
        </View>
        <View style={styles.bigStatVal}>
          <Text style={styles.bigStatValue}>3000</Text>
          <FontAwesome name="caret-down" size={24} color="black" />
        </View>
      </View>

      {/* Start Data Entry Section */}
      <TouchableOpacity style={styles.startEntryBtn} onPress={() => navigation.navigate('Student')}>
        <FontAwesome name='power-off' size={100} color="#4A90E2" />
        <Text style={styles.startEntryText}>start entry</Text>
      </TouchableOpacity>

      <View style={styles.settingBar}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome name="sliders" size={24} color="black" style={styles.settingsIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.last24hText}>Last 24h <FontAwesome name="caret-down" size={14} color="black" /></Text>
        </TouchableOpacity>
      </View>

      {/* Data Entry Location Section */}
      <View style={styles.locationCard}>
        <Text style={styles.locationText}>Ward: <Text style={styles.locationValue}>{locationData.ward}</Text></Text>
        <Text style={styles.locationText}>Location: <Text style={styles.locationValue}>{locationData.location}</Text></Text>
        <Text style={styles.locationText}>Sub Location: <Text style={styles.locationValue}>{locationData.subLocation}</Text></Text>
      </View>

      {/* Footer Navigation Bar */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Share')}><FontAwesome name='upload' size={24} color='#000' /></TouchableOpacity>
        <FontAwesome name='bell' size={24} color='#000' />
        <FontAwesome name='trash' size={24} color='#000' />
        <FontAwesome name='clock-o' size={24} color='#000' />
        <FontAwesome name='home' size={24} color='#000' />
      </View>

      {/* Modal Settings for Location */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}> Set Entry Location</Text>
            <Picker
              selectedValue={newLocationData.ward}
              onValueChange={(itemValue) => setNewLocationData({ ...newLocationData, ward: itemValue })}
            >
              <Picker.Item label="Malaba Central" value="Malaba Central Ward" />
              <Picker.Item label="Malaba North" value="Malaba North Ward" />
            </Picker>

            <Picker
              selectedValue={newLocationData.location}
              onValueChange={handleLocationChange}
            >
              {locations.map((loc, index) => (
                <Picker.Item key={index} label={loc} value={loc} />
              ))}
            </Picker>
            <Picker
              selectedValue={newLocationData.subLocation}
              onValueChange={(itemValue) => setNewLocationData({ ...newLocationData, subLocation: itemValue })}
            >
              {subLocations.map((subLoc, index) => (
                <Picker.Item key={index} label={subLoc} value={subLoc} />
              ))}
            </Picker>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.footerBtnC} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerBtnS} onPress={handleSaveLocation}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  icon: {
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  funEntryText: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 20,
    color: '#777',
  },
  statisticsCard: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    paddingTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 2,
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bigStatVal: {
    alignItems: 'center',
  },
  bigStatValue: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 1,
    textAlign: 'center',
  },
  startEntryBtn: {
    alignItems: 'center',
    marginTop: 30,
  },
  startEntryText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  settingBar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 25,
  },
  last24hText: {
    fontSize: 14,
    color: '#777',
  },
  settingsIcon: {
    fontSize: 18,
  },
  locationCard: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  locationText: {
    fontSize: 16,
  },
  locationValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    marginTop: 'auto',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: '50%',
    top: '50%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalFooter: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  footerBtnC: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#200',
    borderRadius: 8,
    paddingVertical: 10,
    width: '50%',
  },
  footerBtnS: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 10,
    width: '50%',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
