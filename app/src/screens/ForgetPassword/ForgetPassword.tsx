
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image,Alert } from 'react-native';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleResetPassword = () => {
    // Add your password reset logic here
    Alert.alert('Password Reset', `An email has been sent to ${email} with instructions to reset your password.`);
  };

  return (
    <View style={styles.container}>
    <Image source={require('../../assets/images/logo.png')} style={styles.image} />
  <Text style={styles.title}>Forget Password</Text>
  {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
  <TextInput
    style={styles.input}
    placeholder="Email"
    onChangeText={(text) => setEmail(text)}
    value={email}
  />
  <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
    <Text style={styles.buttonText}>Send</Text>
  </TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor:"#ffffff"
},
title: {
fontSize: 24,
marginBottom: 20,
},
input: {
width: '80%',
height: 40,
borderColor: 'gray',
borderWidth: 1,
borderRadius: 5,
marginBottom: 10,
paddingLeft: 10,
},
button: {
backgroundColor: 'blue',
padding: 10,
borderRadius: 5,
width: '80%',
},
buttonText: {
color: 'white',
textAlign: 'center',
},
buttonText1: {
color:'#000000',
textAlign: 'center',
},
buttonText2: {
color:'#FFA500',
textAlign: 'center',
},
error: {
color: 'red',
marginBottom: 10,
},
image: {
width: 150, // Adjust the width as needed
height: 150, // Adjust the height as needed
marginBottom: 20,
},
});


export default ForgotPassword;
