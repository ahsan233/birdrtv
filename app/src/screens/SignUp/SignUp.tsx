// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';

// type props={
//     navigation?:any
// }
// const SignupScreen: React.FC<props> = ({navigation}) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSignup = () => {
//     // Basic validation, you can replace this with your signup logic
//     if (!username || !email || !password) {
//       setErrorMessage('Please fill in all fields');
//       return;
//     }

//     // Add your signup logic here
//     // For example, you can make an API request to create a new user account

//     // If signup is successful, you can navigate to another screen
//     // navigation.navigate('Home');
//   };
//   const goToSignIn = () => {
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//         <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
//         <Image source={require('../../assets/images/logo.png')} style={styles.image} />
//       <Text style={styles.title}>Signup</Text>
//       {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={(text) => setUsername(text)}
//         value={username}
//       />
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
//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Signup</Text>
//       </TouchableOpacity>
//       <View style={{flexDirection:"row",marginTop:20,alignItems:"center",justifyContent:"center"}}>
//       <Text style={styles.buttonText1}>Already have an account?</Text>
//       <TouchableOpacity  onPress={goToSignIn} >
//         <Text style={styles.buttonText2}>SignIn</Text>
//       </TouchableOpacity>
//       </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor:"#ffffff"
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

// export default SignupScreen;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

interface SignUpProps {
  navigation?: any; // You can replace 'any' with a more specific type if available
}

export default function SignUp({ navigation }: SignUpProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log('✅ Sign-up Confirmed');
      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      console.log('❌ Error signing up...', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create a new account</Text>
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
        <AppTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppButton title="Sign Up" onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.forgotPasswordButtonText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
