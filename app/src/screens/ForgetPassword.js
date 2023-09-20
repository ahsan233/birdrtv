import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function ForgetPassword() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  async function forgotPassword() {
    try {
      const data = await Auth.forgotPassword(username);
      console.log(data);
      navigation.navigate('VerifyOTP')
    } catch(err) {
      console.log(err);
    }
  } 

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
      <Text style={[styles.title, {marginVertical: 20}]}>Forget Password</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          //  leftIcon="account"
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <AppButton title="Send" onPress={()=>forgotPassword()} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '600',
  },
});
