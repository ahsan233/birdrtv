// import React from 'react';
// import {SafeAreaView, StatusBar, Text} from 'react-native';

// const AddProducts = (props) => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <Text>Add Products</Text>
//       </SafeAreaView>
//     </>
//   );
// };

// export default AddProducts;

import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView,View} from 'react-native';
import { Auth,API, graphqlOperation } from 'aws-amplify';
import { createProduct } from '../../../src/graphql/mutations';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ImageUploader from '../components/ImageUploader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';

// const Form = t.form.Form;
// const User = t.struct({
//   name: t.String,
//   price: t.Number,
//   description: t.String,
// });
const AddProducts = ({navigation}) => {
  const [form, setForm] = useState(null); 
  const [initialValues, setInitialValues] = useState({});
  const [productName, setProductName] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [photo, setPhoto] = useState({});
  const [fileName, setfileName] = useState(null);
  const [uploadedphoto, setUploadedPhoto] = useState(null)
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
  console.log('key=====>',fileName);
//   useEffect(() => {
//     fetchImage();
//   }, [])
  
// const fetchImage = async()=>{
//   const uploading=await Storage.get('20230831_194021.jpg');
//   console.log('uploading==',uploading)
//   setUploadedPhoto(uploading);
// }
//   const options = {
//     auto: 'placeholders',
//     fields: {
//       description: {
//         multiLine: true,
//         stylesheet: {
//           ...Form.stylesheet,
//           textbox: {
//             ...Form.stylesheet.textbox,
//             normal: {
//               ...Form.stylesheet.textbox.normal,
//               height: 100,
//               textAlignVertical: 'top',
//             },
//           },
//         },
//       },
//     },
//   };
// const handleSubmit = async () => {

// //     try{
// //         const value= await form.getValue();
// //         const user = await Auth.currentAuthenticatedUser();
    
// //         const response = await API.graphql(
// //             graphqlOperation(createProduct,{
// //                 input:{
// //                  name:value.name,
// //                  price:value.price,
// //                  description:value.description,
// //                  userId:user.attributes.sub,
// //                  userName:user.username
    
// //                 }
// //             })
// //         )
// //         console.log('Response=',response)
// //     }catch(e){
// // console.log(e.message)
// //     }
//     // Saving product details
//     try {
//     //   const value = await form.getValue();
//       const user = await Auth.currentAuthenticatedUser();
//       const response = await API.graphql(
//         graphqlOperation(createProduct, {
//           input: {
//             name: 'Samsung',
//             description: 'smartphone',
//             price: 23.99,
//             userId: user.attributes.sub,
//             userName: user.username,
//             image:'image link here.jpg'
//           },
//         }),
//         console.log('inside----------')
//       );
//       console.log('Response :\n');
//       console.log(response);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

const handleSubmit = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    console.log('User--',user)
    // if (photo) {
    //   const res = await fetch(photo.uri);
    //   const blob = await res.blob();
    //   console.log('FileName::: \n');
    //   await Storage.put(photo.fileName, blob, {
    //     contentType: 'image/jpeg',
    //   });
    // }
    // const response = await API.graphql(
    //   graphqlOperation(createProduct, {
    //     input: {
    //       name: productName,
    //       price: productPrice,
    //       description: productDescription,
    //       userId: user.attributes.sub,
    //       userName: user.username,
    //       image: fileName,
    //     },
    //   }),
    // );
    // console.log('Response :\n');
    // console.log(response);
    // navigation.navigate('Home');
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
          placeholder="Enter Product Name"
        />
          <AppTextInput
          value={productPrice}
          onChangeText={text => setproductPrice(text)}
          placeholder="Enter Product Price"
        />
          <AppTextInput
          value={productDescription}
          onChangeText={text => setProductDescription(text)}
          placeholder="Enter Product Description"
        />
            {
             <ImageUploader photo={Object.keys(photo).length>0 ?photo?.uri:''} 
             handleChoosePhoto={handleChoosePhoto} />
            } 
            <View style={{alignItems:"center"}}>
          <AppButton title="Add" onPress={handleSubmit} />
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
export default AddProducts;