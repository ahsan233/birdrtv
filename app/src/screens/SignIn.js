import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Button,
} from 'react-native';
import {Amplify, Auth, Hub} from 'aws-amplify';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../services/useAuth';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function SignIn({updateAuthState}) {
  const {signIn} = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          navigation.navigate('HomeScreen');
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }, []);
  console.log('User==>', user);
  const handleLogin = async () => {
    // const username = 'user123'; // Replace with actual input values
    // const password = 'password123'; // Replace with actual input values

    await signIn({username, password});
    // You can add logic to navigate to another screen or show a message here
    //navigation.navigate('CreateProfile')
    updateAuthState('loggedIn');
  };

  // async function signIn() {
  //   try {
  //     await Auth.signIn(username, password);
  //     console.log('✅ Success');
  //     // updateAuthState('loggedIn');
  //     navigation.navigate('HomeScreen');
  //   } catch (error) {
  //     console.log('❌ Error signing in...', error);
  //   }
  // }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={[styles.title, {marginVertical: 20}]}>Sign In</Text>
        <Text style={styles.title}>Sign in to your account</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppButton title="Login" onPress={() => handleLogin()} />
        <View style={{width: 300, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgotPasswordButtonText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: 80,
            justifyContent: 'space-between',
            marginTop: 100,
          }}>
          <TouchableOpacity
            onPress={() =>
              Auth.federatedSignIn({
                provider: 'Google',
              })
            }>
            <Icon name={'google'} color={'#000'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Auth.federatedSignIn({
                provider: 'Facebook',
              })
            }>
            <Icon name={'facebook'} color={'#000'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>

          {/* <Button title="Open Hosted UI" onPress={() => Auth.federatedSignIn()} /> */}
          <Text>{user && user.getUsername()}</Text>
        </View>
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
    marginTop: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: 'tomato',
    fontSize: 16,
    fontWeight: '600',
  },
});
