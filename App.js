import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from './app/src/screens/SignIn';
import SignUp from './app/src/screens/SignUp';
import ConfirmSignUp from './app/src/screens/ConfirmSignUp';
import Home from './app/src/screens/Home';
import ForgetPassword from './app/src/screens/ForgetPassword';
import ResetPassword from './app/src/screens/ResetPassword';
import VerifyOTP from './app/src/screens/VerifyOTP';
import AddProducts from './app/src/screens/AddProduct';
import EditProducts from './app/src/screens/EditProducts';
import CreateProfile from './app/src/screens/CreateProfile';
import UserProfile from './app/src/screens/UserProfile';
import Icon from 'react-native-vector-icons/FontAwesome';
import {toGammaSpace} from 'react-native-reanimated';
const AuthenticationStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name={'home'} size={30} color="tomato" />
            ) : (
              <Icon name={'home'} size={30} color="#000000" />
            ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name={'user'} size={25} color="tomato" />
            ) : (
              <Icon name={'user'} size={25} color="#000000" />
            ),
        }}>
        {screenProps => (
          <UserProfile
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn"  options={{headerShown: false}}>
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp}    options={{headerShown: false}}/>
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
        //  options={{headerShown: false}}
      />
      <AuthenticationStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
          options={{headerShown: false}}
      />
      <AuthenticationStack.Screen
        name="ResetPassword"
        component={ResetPassword}
       options={{headerShown: false}}
      />
      <AuthenticationStack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
          options={{headerShown: false}}
      />
      <AuthenticationStack.Screen
        name="CreateProfile"
        component={CreateProfile}
        //  options={{headerShown: false}}
      />
      <AuthenticationStack.Screen
        name="HomeScreen"
        component={MyTabs}
        options={{headerShown: false}}
        //  options={{headerShown: false}}
      />
    </AuthenticationStack.Navigator>
  );
};
const AppNavigator = props => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="HomeScreen"
        component={MyTabs}
        options={{headerShown: false}}
        //  options={{headerShown: false}}
      />

      <AppStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="CreateProfile" component={CreateProfile} />
      <AppStack.Screen
        name="AddProducts"
        component={AddProducts}
      />
      <AppStack.Screen
        name="EditProducts"
        component={EditProducts}
        //  options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};
const Initializing = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};
function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  useEffect(() => {
    checkAuthState();
  }, []);
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('✅ User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('❌ User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }
  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator updateAuthState={updateAuthState} />
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  );
}
export default App;
