import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, Button, Colors } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '59916128806-n9gski77psno3nafvb3d0u9o4gk9asgm.apps.googleusercontent.com',
});

export default class SignIn extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    registerUser = () => {
        if (this.state.userName != '' && this.state.password != '' && this.state.email != '') {
        auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
        } else {
            alert("Fields are Empty...")
        }

    }

    onGoogleButtonPress = async() => {
        const { navigate } = this.props.navigation;

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

       // Sign-in the user with the credential
       const user = auth().signInWithCredential(googleCredential);
       navigate('TabNavigator', { name: 'TabNavigator' })
       console.log(user);
    }

    userLogin = () => {
        const { navigate } = this.props.navigation;
        if (this.state.email != '' && this.state.password != '') {
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    console.log(user);
                    console.log('User signed in!');
                    navigate('TabNavigator', { name: 'TabNavigator' })
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });
        } else {
            alert("Fields are Empty...")
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <Text style={styles.text}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    label="Enter Your Email"
                    value={this.state.email}
                    onChangeText={text => this.setState(
                        { email: text }
                    )}
                />
                <TextInput
                    style={styles.input}
                    label="Enter Your Password"
                    value={this.state.password}
                    onChangeText={text => this.setState(
                        { password: text }
                    )}
                />
                <Button style={styles.btnSignIn}
                    // icon="camera" 
                    mode="contained"
                    onPress={this.registerUser}>
                    Sign in with Email
                </Button>

                <Button style={styles.btnSignUp}
                    // icon="camera" 
                    mode="contained"
                    onPress={() => navigate('SignUp', { name: 'SignUp' })} >
                    Sign Up
                </Button>

                <GoogleSigninButton
                    style={{ width: 350, height: 55 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: ({
        color: 'black',
        fontSize: 40,
        marginBottom: 150
    }),
    btnSignIn: {
        marginTop: 40,
        width: 350,
        height: 45,
        marginBottom :20
    },
    btnSignUp: {
        marginTop: 10,
        width: 350,
        height: 45,
        marginBottom :20
    },
    container: ({
        flex: 1,
        alignItems: 'center'

    }),
    input: ({
        width: 350,
        height: 50,
        marginTop: 20
    }),
    googleBtn: ({
        marginTop: 60,
        width: 400,
        height: 60
    })
})