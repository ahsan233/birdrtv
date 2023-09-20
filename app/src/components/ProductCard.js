import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View,ActivityIndicator, TouchableOpacity} from 'react-native';
import {Card, Icon, Image} from 'react-native-elements';
import {Storage} from 'aws-amplify';
import VecIcon from 'react-native-vector-icons/FontAwesome';
import { Auth,API, graphqlOperation } from 'aws-amplify';
import { deleteProduct } from '../../../src/graphql/mutations';
import { useNavigation } from '@react-navigation/native';
const ProductCard = ({
  productName,
  productOwner,
  productPrice,
  productImage,
  productDescription,
  productId,
}) => {
  const navigation= useNavigation();
  const [imageSource, setImageSource] = useState('');
  const getImage = async () => {
    try {
      const imageURL = await Storage.get(productImage);
      setImageSource(imageURL);
    } catch (e) {
      console.log(e);
    }
  };
  const productItem ={
    productName,
    productOwner,
    productPrice,
    productImage,
    productDescription,
    productId,
  }
  useEffect(() => {
    getImage();
  }, []);

  const handleDelete = async (id) => {
    // try {
    //   const user = await Auth.currentAuthenticatedUser();
    //   const response = await API.graphql(
    //     graphqlOperation(deleteProduct, {
    //       input: {
    //         name: productName,
    //         price: productPrice,
    //         description: productDescription,
    //         userId: user.attributes.sub,
    //         userName: user.username,
    //         image: productImage,
    //       },
    //     }),
    //   );
    //   console.log('Product Deleted :\n');
    //   console.log(response);
    //   navigation.navigate('Home');
    // } catch (e) {
    //   console.log('Error======',e);
    // }
    try {
        const input = { id };
        const result = await API.graphql(
          graphqlOperation(deleteProduct, {
            input
          })
        );
        console.log('Deleted Product----',result)
      } catch (err) {
        console.log('Error==>',err);
      }
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={styles.cardTitle}>{productName}</Card.Title>
      <View style={{justifyContent:"flex-end",flexDirection:"row",marginVertical:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('EditProducts',{productDetail:productItem})}>
      <VecIcon name={'edit'} size={20} color="#000000"  />
      </TouchableOpacity>
      <View style={{width:10}}/>
      <TouchableOpacity onPress={()=>handleDelete(productId)}>
      <VecIcon name={'trash'} size={20} color="#ff0000" />
      </TouchableOpacity>
      </View>
      <Card.Divider />
      {imageSource && (
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: imageSource}} style={styles.productImage} resizeMode='cover' />
        </View>
      )}
      {!imageSource && (
        <View style={{alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'tomato'} />
        </View>
      )}
      <Text style={styles.productPrice}>{productPrice}$</Text>
      <View style={styles.ownerTitle}>
        <Icon name="person-pin" />
        <Text style={styles.productOwner} numberOfLines={1}>
          {productOwner}
        </Text>
      </View>
      <Text style={styles.productOwner} numberOfLines={1}>
          {productDescription}
        </Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
  },
  productPrice: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  altView: {
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
  },
  productOwner: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    width: '80%',
  },
  ownerTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default ProductCard;
