import React from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import AppButton from './AppButton';
const ImageUploader = ({handleChoosePhoto, photo}) => {
  return (
    <View style={styles.imageView}>
      {photo && <Image source={{uri: photo}} style={styles.photo} />}
       <AppButton title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  photo: {
    width: 200,
    height: 200,
  },
});

export default ImageUploader;