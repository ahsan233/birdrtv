import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView,View} from 'react-native';
import { Auth,API, graphqlOperation } from 'aws-amplify';
import { updateProduct } from '../../../src/graphql/mutations';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ImageUploader from '../components/ImageUploader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';

const EditProducts = ({navigation,route}) => {
  const productDetail = route.params;
  console.log('Details on Edit Screen',productDetail);

  const [form, setForm] = useState(null); 
  const [initialValues, setInitialValues] = useState({});
  const [productName, setProductName] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
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
    // if (photo) {
    //   const res = await fetch(photo.uri);
    //   const blob = await res.blob();
    //   console.log('FileName::: \n');
    //   await Storage.put(photo.fileName, blob, {
    //     contentType: 'image/jpeg',
    //   });
    // }
    const response = await API.graphql(
      graphqlOperation(updateProduct, {
        input: {
          id:productDetail?.productDetail?.productId,
          name: productName,
          price: productPrice,
          description: productDescription,
          userId: user.attributes.sub,
          userName: user.username,
          image: fileName,
        },
      }),
    );
    console.log('Product Updated:\n');
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
          value={productName}
          onChangeText={text => setProductName(text)}
          placeholder={productDetail.productDetail.productName}
        />
          <AppTextInput
          value={productPrice}
          onChangeText={text => setproductPrice(text)}
          placeholder="Enter Product Price"
        />
          <AppTextInput
          value={productDescription}
          onChangeText={text => setProductDescription(text)}
          placeholder={productDetail.productDetail.productDescription}
        />
            {
             <ImageUploader photo={Object.keys(photo).length>0 ?photo?.uri:''} 
             handleChoosePhoto={handleChoosePhoto} />
            } 
            <View style={{alignItems:"center"}}>
          <AppButton title="Edit" onPress={handleSubmit} />
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
export default EditProducts;