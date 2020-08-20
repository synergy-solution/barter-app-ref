import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Modal
} from 'react-native';
import firebase from "firebase";
import db from '../config'

export default class WelcomeScreen extends Component {

    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: 'false',
            firstName : "",
            lastName : "",
            mobileNumber:"",
            address : "",
            confirmPassword : ""
        }
    }

    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: '100%'}}>
                        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text
                                style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    fontSize: 30,
                                    color: '#ff5722',
                                    margin: 50
                                }}
                            >Registration</Text>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"First Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Last Name"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Mobile Number"}
                                maxLength={10}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    this.setState({
                                        mobileNumber: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Address"}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        address: text
                                    })
                                }}
                            />
                            <TextInput
                                style={styles.formTextInput}
                                placeholder={"Email"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({
                                        emailId: text
                                    })
                                }}
                            /><TextInput
                            style={styles.formTextInput}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        /><TextInput
                            style={styles.formTextInput}
                            placeholder={"Confrim Password"}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    confirmPassword: text
                                })
                            }}
                        />
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() =>
                                        this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                    }
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => this.setState({"isModalVisible": false})}
                                >
                                    <Text style={{color: '#ff5722'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );

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

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("password doesn't match\nCheck your password.")
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then((response) => {
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        mobile_number: this.state.mobileNumber,
                        emailId: this.state.emailId,
                        address: this.state.address
                    })
                    return Alert.alert(
                        'User Added Successfully',
                        '',
                        [
                            {text: 'OK', onPress: () => this.setState({"isModalVisible": false})},
                        ]
                    );
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                });
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    {
                        this.showModal()
                    }
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.title}>Barter</Text>
                    <Text style={{color:'#ff8a65'}}> A Trading Method </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold',marginLeft:55}}>USERNAME</Text>
                    <View style={{alignItems:'center'}}>
                        <TextInput
                            style={styles.loginBox}
                            keyboardType ={'email-address'}
                            onChangeText={(text)=>{
                                this.setState({
                                    username: text
                                })
                            }}
                        />
                    </View>
                    <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold',marginLeft:55}}>PASSWORD</Text>
                    <View style={{alignItems:'center'}}>
                        <TextInput
                            style={styles.loginBox}
                            secureTextEntry = {true}
                            onChangeText={(text)=>{
                                this.setState({
                                    password: text
                                })
                            }}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity
                            style={[styles.button,{marginBottom:10}]}
                            onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
                        >
                            <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{
                                this.setState({"isModalVisible":true})
                            }}
                        >
                            <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffe0b2'
    },
    profileContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    title :{
        fontSize:60,
        fontWeight:'300',
        // fontFamily:'AvenirNext-Heavy',
        color : '#ff9800'
    },
    loginBox:{
        width: 300,
        height: 35,
        borderBottomWidth: 1.5,
        borderColor:'#ffab91',
        fontSize: 20,
        marginBottom:20,
        marginTop:5

    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ffff",
        elevation:10
    },
    buttonContainer:{
        flex:1,
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
    },
    registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
    },
});