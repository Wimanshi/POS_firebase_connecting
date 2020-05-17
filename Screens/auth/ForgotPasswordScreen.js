import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            email:"",
        };
    }

    onResetPasswordPress = () => {
        
    }

    onBackToLoginPress =() => {
        this.props.navigation.navigate("LoginScreen")
    }

    render(){
        return (
            <View style={{paddingTop:50,alignItems:"center"}}>
                <TextInput style={{width:200, height:40, borderWidth: 1}} value={this.state.email} onChangeText={(text) => {this.setState({email: text})}}/>
                <Button title="Reset Password" onPress={this.onResetPasswordPress} />
                <Button title="Back to Login..." onPress={this.onBackToLoginPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});