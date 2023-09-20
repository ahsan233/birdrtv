// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { Auth } from 'aws-amplify';
// export default function Home({ updateAuthState }) {
//   async function signOut() {
//     try {
//       await Auth.signOut();
//       updateAuthState('loggedOut');
//     } catch (error) {
//       console.log('Error signing out: ', error);
//     }
//   }
//   return (
//     <View style={styles.container}>
//       <Text> 💙 + 💛</Text>
//       <Button title="Sign Out" color="tomato" onPress={signOut} />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 20
//   }
// });

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {listProducts} from '../../../src/graphql/queries';
import {API} from 'aws-amplify';
import ProductList from '../components/ProductList';
export default function Home() {
  const navigation = useNavigation();
  const [productsList, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function signOut() {
    try {
      await Auth.signOut();
      //   updateAuthState('loggedOut');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  const fetchProducts = async () => {
    try {
      const products = await API.graphql({query: listProducts});
      if (products.data.listProducts) {
        // console.log('Products: \n');
        // console.log(products);
        setProducts(products.data.listProducts.items);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={signOut}>
              <Icon name={'sign-out'} size={20} color="#ffffff" />
            </TouchableOpacity> */}
            <Text
              style={{
                color: '#ffffff',
                fontSize: 17,
                fontWeight: 'bold',
                marginLeft: 180,
              }}>
              Home
            </Text>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('AddProducts')}>
              <Icon name={'plus'} size={20} color="#ffffff" />
            </TouchableOpacity>

            {/* <View style={{flexDirection:"row",}}>
        <TouchableOpacity 
        style={{width:'20%',alignItems:"flex-end",marginLeft:10}}
        onPress={()=>navigation.navigate('AddProducts')}
        >
        <Icon name={'plus'} size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={{color:"#ffffff",fontSize:17,fontWeight:"bold"}}>Home</Text>
        <TouchableOpacity 
        style={{width:'20%',}}
        onPress={()=>navigation.navigate('AddProducts')}
        >
        <Icon name={'plus'} size={20} color="#ffffff" />
        </TouchableOpacity>
        </View> */}
          </View>
          <View>
            <Text
              style={{
                color: '#000000',
                fontWeight: 'bold',
                marginTop: 10,
                fontSize: 20,
              }}>
              Product List
            </Text>
          </View>
          {productsList && (
            <ProductList
              productList={productsList}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
1;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: 'tomato',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // title: {
  //   fontSize: 20,
  //   color: '#202020',
  //   fontWeight: '500',
  //   marginVertical: 15,
  // },
  // footerButtonContainer: {
  //   marginVertical: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // forgotPasswordButtonText: {
  //   color: 'tomato',
  //   fontSize: 18,
  //   fontWeight: '600',
  // },
});
