import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { KeyboardAvoidingView } from 'react-native';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userName: '',
        };
    }

    registerUser = () => {
        if (this.state.userName != '' && this.state.password != '' && this.state.email != '') {
            auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((createdUser) => {
                    createdUser.user.updateProfile({
                        displayName: this.state.userName
                    })
                    console.log('User account created & signed up!');
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View>
                    {/* <Image style={styles.img} source={require('../assets/linkedin.png')} /> */}
                </View>
                <Text style={styles.label}> SignUp </Text>
                <TextInput
                    label="Email"
                    value={this.state.email}
                    onChangeText={text => this.setState(
                        { email: text }
                    )}
                    style={styles.input}
                />

                <TextInput
                    label="User Name"
                    value={this.state.userName}
                    onChangeText={text => this.setState(
                        { userName: text }
                    )}
                    style={styles.input}
                />

                <TextInput
                    label="Password"
                    value={this.state.password}
                    onChangeText={text => this.setState(
                        { password: text }
                    )}
                    style={styles.input}
                />
                <Button

                    mode="contained"
                    onPress={() => navigate('SignIn', { name: 'SignIn' })}
                    style={styles.btnSignIn}>
                    SignIn
                </Button>
                <Button mode="contained" onPress={this.registerUser}
                    style={styles.btnSignUp}>
                    SignUp
                </Button>

            </KeyboardAvoidingView>
        );
    }


}
const styles = StyleSheet.create({
    btnSignIn: {
        marginTop: 40,
        width: 350,
        height: 45,
        marginBottom: 20
    },
    btnSignUp: {
        marginTop: 20,
        width: 350,
        height: 45,
        marginBottom: 20
    },
    input: {
        width: 400,
        marginTop: 15,
        borderRadius: 30
    },
    container: {
        alignItems: 'center',
        // backgroundColor:'lightyellow'
    },
    label: {
        marginBottom: 30,
        marginTop: 10,
        fontSize: 50,
        color: 'black'
    },
    img: {
        height: 45,
        width: 45,
        marginTop: 50,
    }
})