import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function VerifyOTP() {
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const navigation = useNavigation();

  async function forgotPasswordSubmit() {
    try {
      const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
      console.log(data);
      navigation.navigate('SignIn');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text>Enter Verification Code here</Text>
        <OTPInputView
          style={{width: '80%', height: 100}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          onCodeChanged={(code) => {
            setCode(code);
          }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          //  leftIcon="account"
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={newPassword}
          onChangeText={text => setnewPassword(text)}
          //  leftIcon="account"
          placeholder="Enter New Password"
          autoCapitalize="none"
          // keyboardType="email-address"
          textContentType="emailAddress"
        />

        <AppButton
          title="Verify"
          onPress={()=>forgotPasswordSubmit()}
        />
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
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
