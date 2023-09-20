import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView,View} from 'react-native';
import { Auth,API, graphqlOperation } from 'aws-amplify';
import {  createUser } from '../../../src/graphql/mutations';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ImageUploader from '../components/ImageUploader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';

const CreateProfile= ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userType, setUserType] = useState('');
  const [photo, setPhoto] = useState({});
  const [fileName, setfileName] = useState(null);
  const [uploadedphoto, setUploadedPhoto] = useState(null);

  const handleChoosePhoto = async () => {
    await launchImageLibrary({},async (response) => {
      console.log('data-------',response);
      if (response?.assets[0]?.uri) {
      const res = await fetch(response?.assets[0].uri);
      const blob = await res.blob();
      console.log('FileName:::',response?.assets[0].fileName);
     const result= await Storage.put(response?.assets[0].fileName, blob,{});
        console.log('Photo Extension: \n');
        console.log(result);
        setPhoto(response?.assets[0]);
        setfileName(result?.key);
      }
    });
  };
  console.log('key=====',fileName);

const handleSubmit = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(createUser, {
        input: {
          name: userFullName,
          city: userCity,
          profile_image: fileName,
          userType:userType,
          email: user.attributes.email,
          bio:userBio,
          userName: userName,
          UserId:user.attributes.sub
         
        },
      }),
    );
    console.log('User Created :\n');
    console.log(response);
    navigation.navigate('Home');
  } catch (e) {
    console.log('Error======',e);
  }
};
return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <AppTextInput
          value={userName}
          onChangeText={text => setUserName(text)}
          placeholder="Enter User Name"
        />
          <AppTextInput
          value={userFullName}
          onChangeText={text => setUserFullName(text)}
          placeholder="Enter Full Name"
        />
          <AppTextInput
          value={userCity}
          onChangeText={text => setUserCity(text)}
          placeholder="Enter City"
        />
        <AppTextInput
          value={userBio}
          onChangeText={text => setUserBio(text)}
          placeholder="Enter Bio"
          multiline={true}
        />
         <AppTextInput
          value={userType}
          onChangeText={text => setUserType(text)}
          placeholder=" Enter User Type"
        />
            {
             <ImageUploader photo={Object.keys(photo).length>0 ?photo?.uri:''} 
             handleChoosePhoto={handleChoosePhoto} />
            } 
            <View style={{alignItems:"center"}}>
          <AppButton title="Create" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
 container:{
    flex:1,
    alignItems:"center",
    justifyContent:'center'
 }
});
export default CreateProfile;