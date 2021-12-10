import React, { Component } from 'react'
import { View } from 'react-native'
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';

export default class Screen extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff'
                }}>
                <LottieView source={require('../assests/animations/LinkedIn_Splash.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={() => {
                        this.props.navigation.replace('SignIn');
                    }}
                />
            </View>
        )
    }
}
