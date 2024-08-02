import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios';
import {getToken} from '../utils/auth';
import { Picker } from '@react-native-picker/picker'

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [locationData, setLocationData] = useState({
    ward: 'Malaba Central',
    location: 'Akadetewai',
    subLocation: 'Olobai', 
  });
  const [newLocationData, setNewLocationData] = useState({...locationData});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://192.168.100.16:5000/user', {
          headers: {
            // Pass the retrieved token in the header
            Authorization: `Bearer ${token}`, 
          },
        });
        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSaveLocation = () => {
    setLocationData(newLocationData);
    setModalVisible(false);
  }

  
  
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
        <Text style={styles.headerText}>{username}</Text>
      </View>
      {/* data entry summary section */}
      <Text style={styles.funEntryText}>FunEntry</Text>
      <View style={styles.statisticsCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Tertiary Sch:</Text>
          <Text style={styles.statValue}>39</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Secondary Sch:</Text>
          <Text style={styles.statValue}>100</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Single Parents:</Text>
          <Text style={styles.statValue}>10</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Partial Orphans:</Text>
          <Text style={styles.statValue}>4</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Orphans:</Text>
          <Text style={styles.statValue}>9</Text>
        </View>
        <View style={styles.bigStatVal}>
          <Text style={styles.bigStatValue}>3000</Text>
          <FontAwesome name="caret-down" size={24} color="black" />
        </View>
      </View>


      {/* start data entry section */}
      <TouchableOpacity style={styles.startEntryBtn} onPress={() => navigation.navigate('Student') }>
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
      

      {/* data entry location section */}
      <View style={styles.locationCard}>
        <Text style={styles.locationText}>Ward: <Text style={styles.locationValue}>{locationData.ward}</Text></Text>
        <Text style={styles.locationText}>Location: <Text style={styles.locationValue}>{locationData.location}</Text></Text>
        <Text style={styles.locationText}>Sub Location: <Text style={styles.locationValue}>{locationData.subLocation}</Text></Text>
      </View>



      {/* Footer navigation bar  */}
      <View style={styles.footer}>
        <FontAwesome name='cog' size={24}  color='#000' />
        <FontAwesome name='bell' size={24}  color='#000' />
        <FontAwesome name='trash' size={24}  color='#000' />
        <FontAwesome name='clock-o' size={24}  color='#000' />
        <FontAwesome name='home' size={24}  color='#000' />
      </View>


      {/* Modal settings for location */}
      <Modal
        animationType="slide"
        transparent ={true}
        visible = {modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}> Set Entry Location</Text>
            <Picker
              selectedValue={newLocationData.ward}
              onValueChange={(itemValue) => setNewLocationData({...newLocationData, ward: itemValue })}
            >
                <Picker.Item label="Malaba Central" value="Malaba Central Ward"/>
                <Picker.Item label="Malaba North" value="Malaba North Ward"/>
            </Picker>
            

            <TextInput 
              style={styles.input}
              placeholder='location'
              value={newLocationData.location}
              onChangeText={(text) => setNewLocationData({ ...newLocationData, location: text })}
            />

            <TextInput 
              style={styles.input}
              placeholder='sub location'
              value={newLocationData.subLocation}
              onChangeText={(text) => setNewLocationData({ ...newLocationData, subLocation: text })}
            />

            <Button title="Save" onPress={handleSaveLocation}/>
            <Button title="Cancel" onPress={() => setModalVisible(false)}  />

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

});

export default HomeScreen;
