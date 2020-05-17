import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, FlatList, TextInput } from 'react-native';
import { Card, FAB, Button } from 'react-native-paper';
import firebase from '../database/firebaseDb';
import { connect } from 'react-redux';
import {setFavoriteAnimal, watchPersonData} from './../redux/app-redux';

const mapStateToProps = (state) => {
    return { 
        favoriteAnimal: state.favoriteAnimal,
        personData: state.personData,
    };
}
const mapDispatchToProps = (dispatch) => {
    return { 
        setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text)) },
        watchPersonData: () => {dispatch(watchPersonData()) },
    };
}

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            favoriteAnimal: this.props.favoriteAnimal,
        }
        this.props.watchPersonData();
    }

    onSetFavoriteAnimalPress = () => {
        this.props.setFavoriteAnimal(this.state.favoriteAnimal);
    }

    render () {
    return (
        <View style={{flex:1}}>   
            <Text>{this.props.favoriteAnimal}</Text>
            <TextInput
                value={this.state.favoriteAnimal}
                onChangeText={(text) => {this.setState({favoriteAnimal:text})}}
            />
            <Button title="Set favorite Animal" onPress={this.onSetFavoriteAnimalPress}/>
            <Text>{this.props.personData.email}</Text>
            <Text>hii</Text>
            <FlatList 
                data={data}
                renderItem={({item})=>{
                    return renderList(item, this.props)
                }}
                keyExtractor={item=>item.id}
            />
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors:{accent:"#4c57ed"}}}
                onPress={() => this.props.navigation.navigate("Create")}
            />
            
        </View>
    );
    }
}
        const data=[
            {id:"1",name:"Mukesh",email:"abcd@abc.com",salary:"6 lpa",phone:"12345",position:"Matara",picture:"../src/Images/profile-pic.jpg"},
            {id:"2",name:"Ramesh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Galle",picture:"../src/Images/profile-pic.jpg"},
            {id:"3",name:"Mahesh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Weligama",picture:"../src/Images/profile-pic.jpg"},
            {id:"4",name:"Nimesh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Matara",picture:"../src/Images/profile-pic.jpg"},
            {id:"5",name:"Suresh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Galle",picture:"../src/Images/profile-pic.jpg"},
            {id:"6",name:"Mukesh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Matara",picture:"../src/Images/profile-pic.jpg"},
            {id:"7",name:"Ramesh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Galle",picture:"../src/Images/profile-pic.jpg"},
            {id:"8",name:"Mahesh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Weligama",picture:"../src/Images/profile-pic.jpg"},
            {id:"9",name:"Nimesh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Matara",picture:"../src/Images/profile-pic.jpg"},
            {id:"10",name:"Suresh",email:"abcd@abc.com",salary:"5 lpa",phone:"12345",position:"Galle",picture:"../src/Images/profile-pic.jpg"}
        ]
        const renderList = ((item, props)=>{
            return(
                <Card style={styles.mycard} onPress={() => props.navigation.navigate("Profile",item)} >
                    <View style={styles.cardView}>
                        <Image style={styles.image} source={require('../src/Images/profile-pic.jpg')}/>
                        <View style={styles.textStyle}>
                            <Text style={{fontSize:20}}>{item.name}</Text>
                            <Text>{item.position}</Text>
                        </View>
                    </View>
                </Card>
            );
        })
        


const styles = StyleSheet.create({
    mycard: {
        flexDirection:'row',
        margin: 5,
        backgroundColor: '#e4e5f7'
    },
    textStyle: {
        fontSize:18,
        marginLeft: 10
    },
    image:{ 
        width: 60,
        height: 60,
        borderRadius: 30
    },
    cardView:{
        flexDirection:'row',
        padding:6
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right:0,
        bottom:0
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);