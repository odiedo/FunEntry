import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios';
import { getToken } from '../utils/auth';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://192.168.100.11:5000/user', {
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

  
  
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
        <Text style={styles.headerText}>{username}</Text>
        <FontAwesome name="sliders" size={24} color="black" style={styles.settingsIcon} />
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

      <Text style={styles.last24hText}>Last 24h <FontAwesome name="caret-down" size={14} color="black" /></Text>

      {/* data entry location section */}
      <View style={styles.locationCard}>
        <Text style={styles.locationText}>Ward: <Text style={styles.locationValue}>Malaba Central</Text></Text>
        <Text style={styles.locationText}>Location: <Text style={styles.locationValue}>Olobai</Text></Text>
        <Text style={styles.locationText}>Sub Location: <Text style={styles.locationValue}>Akadetewai</Text></Text>
      </View>

      {/* Footer navigation bar  */}
      <View style={styles.footer}>
        <FontAwesome name='cog' size={24}  color='#000' />
        <FontAwesome name='bell' size={24}  color='#000' />
        <FontAwesome name='trash' size={24}  color='#000' />
        <FontAwesome name='clock-o' size={24}  color='#000' />
        <FontAwesome name='home' size={24}  color='#000' />
      </View>

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
  settingsIcon: {
    marginLeft: 'auto',
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
  last24hText: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 20,
    fontSize: 14,
    color: '#777',
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

});

export default HomeScreen;
