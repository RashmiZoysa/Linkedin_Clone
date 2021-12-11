import React, { Component } from 'react';
import { View, Text, Image ,StyleSheet} from 'react-native';

export default class AddPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Image
          style={styles.Img}
          source={require('../assests/man1.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Img: ({
    width : 60,
    height :60
  })
})