import React, { Component } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default class PostUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: '',
      imageName: '',
      caption: ''
    };
  }

  getImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      // console.log(image.path);
      this.setState({
        imagePath: image.path
      })
      this.setState({
        imageName: image.modificationDate
      })
      // this.UploadImage()
    });
  }

  clear = async () => {
    ImagePicker.clean().then(() => {
      this.setState({
        imagePath: ''
      })
      this.setState({
        imageName: ''
      })
      this.setState({
        caption: ''
      })
    }).catch(e => {
      alert(e);
    });
  }

  UploadImage = async () => {
    if (this.state.imagePath != '' && this.state.imageName != '' && this.state.caption != '') {
      const fileName = this.state.imageName + ".jpg";
      const reference = storage().ref(`images/${fileName}`);
      await reference.putFile(this.state.imagePath);
      const url = await storage().ref(`images/${fileName}`).getDownloadURL();
      const caption = this.state.caption;
      // console.log(url);

      firestore()
        .collection('urls')
        .add({
          url: url,
          caption: caption,
        })
        .then(() => {
          console.log('Url Added! ' + url);
          alert("Post Uploaded...");
        });
      this.clear();
    } else {
      alert("Fields are Empty...")
    }
  }

  render() {
    const img = { uri: this.state.imagePath };
    return (

      <View style={styles.container}>
        <TextInput
          label="type here..."
          value={this.state.caption}
          onChangeText={text => this.setState(
            { caption: text }
          )}
          style={styles.txt}
        />
        <Image source={img} style={styles.img} />

        <Button
          // icon="camera" 
          mode="contained"
          style={styles.btnSelect}
          onPress={this.getImageFromGallery}>
          Select Image
        </Button>
        <Button
          // icon="send"
          style={styles.btnPost}
          mode="contained" onPress={this.UploadImage}>
          Post Image
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnSelect: ({
    backgroundColor: '#0652DD',
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
    width: 350,
    height: 45,
  }),
  txt: ({
    width: '100%',
    height: 50,
    marginTop: 30,
    borderRadius: 30
  }),
  container: ({
    flex: 1,
    alignItems: 'center'
  }),
  img: ({
    width: 300,
    height: 500,
    resizeMode: 'contain',
    borderColor: "red"
  }),
  btnPost: ({
    backgroundColor: '#0652DD',
    color: 'black',
    borderRadius: 10,
    marginBottom: 10,
    width: 350,
    height: 45,
  })
})