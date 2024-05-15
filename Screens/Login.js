
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Slices/userSlice';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  
  //api login 
//   const isEmailValid = (email) => {
//     // Regular expression for basic email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

   
//   const handleLogin = async () => {
//     if (!isEmailValid(username)) {
//         console.error('Please enter a valid email address');
//         return;
//       }
//     try {
//       const response = await fetch('https://new-api-staging.rydeu.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         // Login successful
//         const data = await response.json();
//         dispatch(login({ username: data.username }));
//         navigation.navigate('Home');
//       } else {
//         // Login failed
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  const handleLogin = () => {
    if (username && password) {
      dispatch(login({ username }));
      navigation.navigate('Home');
    }
  };

  const isFormValid = username && password;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={isFormValid ? styles.button : [styles.button, styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 14,
    paddingLeft: 8,
  },
  label: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'navy',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

