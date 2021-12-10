
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, FlatList } from 'react-native';
// import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
// import FeatherIcon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    firestore()
      .collection('urls')
      .onSnapshot(querySnapshot => {
        const urls = [];

        querySnapshot.forEach(documentSnapshot => {
          urls.push({
            url: documentSnapshot.data().url,
            caption: documentSnapshot.data().caption,
          });
        });

        this.setState({
          data: urls
        })
      });
  }

  renderItem = ({ item, index }) => {
    const img = { uri: item.url };
    return (
      <SafeAreaView>
        <View style={styles.item}>
          <View style={styles.view}>
            <Image
              style={styles.userImg}
              // source={require('../assets/man.png')}
            />
            <Text style={styles.userName}>Rashmi De Zoysa</Text>
            {/* <FeatherIcon style={styles.icon} name="more-vertical" color={'#666666'} size={21} /> */}
            <Text style={styles.txt}>{item.caption}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, height: 1.3, backgroundColor: '#D3D3D3' }} />
            </View>
            <Image
              style={styles.img}
              source={require('../assests/Background.jpg')}
              source={img}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, height: 1.3, backgroundColor: '#D3D3D3' }} />
            </View>
            {/* <AwesomeIcon
              style={styles.like} name="thumbs-up" color={'#666666'} size={21}
            />
            <AwesomeIcon
              style={styles.comment}
              name="comment" color={'#666666'} size={21}
            />
            <AwesomeIcon
              style={styles.share}
              name="share-square" color={'#666666'} size={21}
            />
            <AwesomeIcon
              style={styles.send}
              name="paper-plane" color={'#666666'} size={21}
            /> */}
          </View>
        </View>
      </SafeAreaView>
    )
  }

  render() {
    return (
      <SafeAreaView>
        {/* <Searchbar
        // style={{position:'relative'}}
        placeholder="Search"
        onChangeText={this.onChangeSearch}
        value={this.state.searchQuery} 
        />  */}
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'white'
  },
  view: {
    // marginTop: 1,
    height: 470,
    borderRadius: 30,
    shadowColor: '#0000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 3,
    
  },
  item: {
    marginVertical: 3,
    borderRadius: 30,
    // marginBottom:5
  },
  userImg: {
    marginTop: 15,
    marginLeft: 15,
    width: 40,
    height: 40,
    borderRadius:100,
  },
  like: {
    marginTop: 10,
    marginLeft: 30,

  },
  comment: {
    marginTop: -20,
    marginLeft: 135,

  },
  share: {
    marginTop: -23,
    marginLeft: 250,

  },
  send: {
    marginTop: -23,
    marginLeft: 350,

  },
  icon: {
    marginLeft: 380,
    marginTop: -20,

  },
  userName: {
    marginLeft: 60,
    marginTop: -40,
    fontSize: 20,
    color: '#202124',
    fontWeight: 'bold',
  },
  img: {
    // flex: 1,
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  txt: {
    marginLeft: 60,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 15,
    color: '#202124',
  },
})
