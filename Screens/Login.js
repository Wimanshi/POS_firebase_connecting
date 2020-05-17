import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
    //remove header
    static navigationOptions = {
        headerShown: false,
        
    }
      
    callback = () => this.props.navigation.navigate('Home');
    render () {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../src/Images/logo.jpg')} />
                    <Text style={styles.title}>Welcome to the delivery app</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm callback = {this.callback}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        opacity:0.8
    }
});