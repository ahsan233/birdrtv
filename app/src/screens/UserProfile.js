import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {createUser} from '../../../src/graphql/mutations';
import AppButton from '../components/AppButton';
import {Storage} from 'aws-amplify';
import {getUser} from '../../../src/graphql/queries';
import {useNavigation} from '@react-navigation/native';
const UserProfile = ({updateAuthState}) => {
  const [userName, setUserName] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userType, setUserType] = useState('');
  const [photo, setPhoto] = useState({});
  const [fileName, setfileName] = useState(null);
  const [imageSource, setImageSource] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  const fetchuserDetails = async () => {
    try {
      // Replace 'userIdToFetch' with the actual user ID you want to fetch
      //  const userIdToFetch = '123'; // Replace with the actual user ID
      const Id = await Auth.currentAuthenticatedUser();
      console.log('id=', Id.attributes.sub);

      //   console.log('Id----->',userId.attributes.sub)
      //   const user = await API.graphql({
      //     query: getUser,
      //     variables: {
      //       id: userId.attributes.sub,
      //     },
      //   });
      // const oneTodo = await API.graphql(
      //     graphqlOperation(queries.getUser, { id:  userId })
      //   );
      // const oneTodo = await API.graphql({
      //     query: getUser,
      //     variables: { UserId: '14b8b468-20c1-70de-c6c2-972c8ca67851' }
      //   });

      //   console.log('User-----==>',oneTodo)
      setIsLoading(true);
      const UserDetail = await API.graphql({
        query: getUser,
        variables: {id: '2d463cd5-4bb6-45b4-a35b-c3f59b844213'},
      });

      console.log('User-----==>', UserDetail?.data?.getUser);
      const res = UserDetail?.data?.getUser;
      setfileName(res?.profile_image);
      setUserFullName(res?.name);
      setUserName(res?.userName);
      setUserEmail(res?.email);
      setUserBio(res?.bio);
      setUserCity(res?.city);
      //   if (user.data.getUser) {
      //     console.log('User: \n', user.data.getUser);
      //     // You can now access user data like user.data.getUser.name, user.data.getUser.email, etc.
      //   }
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchuserDetails();
    getImage();
  }, []);

  // const fetchuserDetails = async () => {
  //     try {
  //       const user = await API.graphql({query: listProducts});
  //       if (products.data.listProducts) {
  //         console.log('User: \n');
  //         console.log(user);
  //         //setProducts(products.data.listProducts.items);
  //       }
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchuserDetails();
  //   }, []);

  const getImage = async () => {
    try {
      const imageURL = await Storage.get(fileName);
      setImageSource(imageURL);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        ) : (
          <ScrollView>
            {imageSource && (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: imageSource}}
                  style={styles.profileImage}
                  // resizeMode="cover"
                />
              </View>
            )}
            {/* {!imageSource && (
<View style={{alignItems: 'center'}}>
<ActivityIndicator size={'large'} color={'tomato'} />
</View>
)} */}
            <View>
              <Text style={styles.name}>{userFullName}</Text>
              <Text style={styles.name}>@ {userName}</Text>
              <View style={{marginTop: 20}}>
                <Text style={styles.headings}>Email</Text>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.container1}>
                    <Text style={styles.attributes}>{userEmail}</Text>
                  </View>
                </View>
                <Text style={styles.headings}>Bio</Text>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.container1}>
                    <Text style={styles.attributes}>{userBio}</Text>
                  </View>
                </View>
                <Text style={styles.headings}>City</Text>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.container1}>
                    <Text style={styles.attributes}>{userCity}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 80}}>
              <AppButton title="Logout" onPress={()=>signOut()} />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems:"center",
    // justifyContent:'center'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#dcdcdc',
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  container1: {
    width: '80%',
    height: 50,
    backgroundColor: '#dcdcdc',
    borderRadius: 25,
    justifyContent: 'center',
    marginVertical: 10,
  },
  attributes: {
    fontSize: 17,
    color: '#000',
    marginLeft: 15,
  },
  headings: {
    marginLeft: 40,
    color: '#000',
    fontWeight: 'bold',
  },
});
export default UserProfile;
