// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';

// type props ={
// navigation?:any
// }

// const LoginScreen: React.FC<props> = ({navigation}) => {
//  //   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const goToSignup = () => {
//     navigation.navigate('SignUp');
//   };

//   const handleLogin = () => {
//     // Basic validation, you can replace this with your authentication logic
//     if (!email || !password) {
//       setErrorMessage('Please fill in all fields');
//       return;
//     }

//     // Add your authentication logic here
//     // For example, you can make an API request to validate the user's credentials

//     // If login is successful, you can navigate to another screen
//     //navigation.navigate('Signup')
//   };



//   return (
//     <View style={styles.container}>
//           <Image source={require('../../assets/images/logo.png')} style={styles.image} />
//       <Text style={styles.title}>Welcome</Text>
//       {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={(text) => setEmail(text)}
//         value={email}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={(text) => setPassword(text)}
//         value={password}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <View style={{flexDirection:"row",marginTop:20}}>
//       <Text style={styles.buttonText1}>Don't have an account?</Text>
//       <TouchableOpacity  onPress={goToSignup} >
//         <Text style={styles.buttonText2}>SignUp</Text>
//       </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor:"#fff"
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     width: '80%',
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   buttonText1: {
//     color:'#000000',
//     textAlign: 'center',
//   },
//   buttonText2: {
//     color:'#FFA500',
//     textAlign: 'center',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   image: {
//     width: 150, // Adjust the width as needed
//     height: 150, // Adjust the height as needed
//     marginBottom: 20,
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

interface SignInProps {
  navigation: any; // You can replace 'any' with a more specific type if available
  updateAuthState: (state: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ navigation, updateAuthState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log('✅ Success');
      updateAuthState('loggedIn');
    } catch (error) {
      console.log('❌ Error signing in...', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppButton title="Login" onPress={signIn} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  footerButtonContainer: {
    marginTop: 20,
  },
  forgotPasswordButtonText: {
    color: 'blue', // You can customize the color
  },
});

export default SignIn;
