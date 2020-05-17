import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, FlatList } from 'react-native';
import firebase from '../database/firebaseDb';

class UserScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('users');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  
  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      userArr.push(res.data());
      console.log(res.data())
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }
  /*getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { firstName, email, phoneNumber } = res.data();
      userArr.push({
        key: res.id,
        res,
        firstName,
        email,
        phoneNumber,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }*/

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <ScrollView style={styles.container}>
          {
            this.state.userArr.map((item, i) => {
              return (
                <FlatList
                  key={i}
                  chevron
                  bottomDivider
                  title={item.firstName}
                  subtitle={item.email}
                  onPress={() => {
                    this.props.navigation.navigate('UserDetailScreen', {
                      userkey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default UserScreen;