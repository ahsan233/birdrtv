import {Auth} from 'aws-amplify';

export const useAuth = () => {

  type SignInParameters = {
    username: string;
    password: string;
  };

  type ConfirmSignUpParameters = {
    username: string;
    code: string;
  };

  type SignUpParameters = {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
  };

  async function signIn({username, password}: SignInParameters) {
    try {
      const user = await Auth.signIn(username, password);
      console.log('Response=>',user)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async function signUp({
    username,
    password,
    email,
    phoneNumber,
  }: SignUpParameters) {
    try {
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phoneNumber, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log("Response=>",user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp({username, code}: ConfirmSignUpParameters) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async function changePassword(oldPassword: string, newPassword: string) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);
      console.log('Response=>',data);
    } catch (err) {
      console.log(err);
    }
  }
  async function forgotPassword(username: string) {
    try {
      const data = await Auth.forgotPassword(username);
      console.log("Response=>",data);
    } catch (err) {
      console.log(err);
    }
  }

  // Collect confirmation code and new password
  async function forgotPasswordSubmit(
    username: string,
    code: string,
    newPassword: string,
  ) {
    try {
      const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
      console.log("Response=>",data);
    } catch (err) {
      console.log(err);
    }
  }

  async function currentAuthenticatedUser() {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      console.log("Response=>",user);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    signIn,
    signOut,
    signUp,
    confirmSignUp,
    changePassword,
    forgotPassword,
    forgotPasswordSubmit,
    currentAuthenticatedUser,
  };
};
