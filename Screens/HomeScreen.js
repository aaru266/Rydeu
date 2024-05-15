// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../Components/Calendar';
import { logout } from '../Redux/Slices/userSlice';
import DatePicker from '../Components/Datepicker';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {user.username}</Text>
        <Button title="Logout" onPress={handleLogout} color={'navy'}/>
      </View>
      <Calendar onDateSelect={handleDateSelect} />
      <View style={styles.datePickerContainer}>
      <DatePicker onConfirm={handleDateSelect} style={styles.datePicker} />
      <Text style={{marginTop:20,fontSize:13,fontWeight:'500'}}>Selected Date: {selectedDate.toString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight:'500'
  },
  datePickerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  datePicker: {
    width: 300, 
    height: 50, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: 'gray', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});
