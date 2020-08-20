import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from "firebase";
import db from'../config'

export default class WelcomeScreen extends Component {

    constructor() {
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }

    userLogin = function (emailId, password) {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(function (user) {
                //Any logic that you need after login. Do it here.
                console.log("Congrats! User has successfully signed in");
                Alert.alert("Congrats! User has successfully signed in");
                // Uncomment below line to see all the details in the user object returned by firebase
                // console.log(JSON.stringify(user));
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("Unable to sign in " + errorCode);
                console.log("Unable to sign in " + errorMessage);
                Alert.alert("Unable to sign in " + errorCode + "\n" + errorMessage);
            });
    }

    userSignUp = (emailId, password) => {
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(function (user) {
                console.log("Sign up successful!");
                console.log("Congrats! User has successfully signed in");
                Alert.alert("Sign up successful! and user has successfully signed in");
            })
            .catch(function (error) {
                //Any logic that you need to handle if user could not successfully signup. Do it here.
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("Unable to sign up " + errorCode);
                console.log("Unable to sign up " + errorMessage);
                Alert.alert("Unable to sign up " + errorCode + "\n" + errorMessage);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Login</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.login}
                        placeholder="abc@examples.com"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            this.setState({emailId: text})
                        }}
                    />
                    <TextInput
                        style={styles.login}
                        placeholder="enter password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({password: text})
                        }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.userLogin(this.state.emailId, this.state.password)}>
                        <Text>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.userSignUp(this.state.emailId, this.state.password)}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        width: 300,
        height: 35,
        borderBottomWidth: 1.5,
        borderColor: '#ffab91',
        fontSize: 20,
        marginBottom: 20,
        marginTop: 5
    },
    button: {
        width: "75%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#bbbb",
        elevation: 10,
        marginTop: 10,
        marginBottom: 10
    },
});