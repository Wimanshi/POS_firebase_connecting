import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, Modal, Alert} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee =() => {
        const [Name, setName] = useState("")
        const [Phone, setPhone] = useState("")
        const [email, setEmail] = useState("")
        const [salary, setSalary] = useState("")
        const [picture, setPicture] = useState("")
        const [modal, setModal] = useState(false)

        const pickFromGallery = async () => {
            const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (granted){
                let data = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:true,
                    aspect:[1,1],
                    quality:0.5
                })
                if(!data.cancelled){
                    let newfile={
                        uri:data.uri,
                        type:`test/${data.uri.split(".")[1]}`,
                        name:`test.${data.uri.split(".")[1]}`
                    }
                    handleUpload(newfile)
                }
            }else{
                Alert.alert("You need to give permission to access the Gallery")
            }
        }

        const pickFromCamera = async () => {
            const {granted} = await Permissions.askAsync(Permissions.CAMERA)
            if (granted){
                let data = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:true,
                    aspect:[1,1],
                    quality:0.5
                })
                if(!data.cancelled){
                    let newfile={
                        uri:data.uri,
                        type:`test/${data.uri.split(".")[1]}`,
                        name:`test.${data.uri.split(".")[1]}`
                    }
                    handleUpload(newfile)
                }
            }else{
                Alert.alert("You need to give permission to access the Camera")
            }
        }

        const handleUpload = (image)=>{
            const data = new FormData()
            data.append('file',image)
            data.append('upload_preset','employeeApp')
            data.append("cloud_name","cloudshashini")

            fetch("https://api.cloudinary.com/v1_1/cloudshashini/image/upload",{
                method:"post",
                body:data
            }).then(res=>res.json()).
            then(data=>{
                console.log(data)
                setPicture(data.url)
                setModal(false)
            })
        }

        return (
            <View style={styles.root}>
                <TextInput
                    label='Name'
                    style={styles.inputStyle}
                    value={Name}
                    theme={theme}
                    mode="outlined"
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label='Email'
                    style={styles.inputStyle}
                    value={email}
                    theme={theme}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label='Phone'
                    style={styles.inputStyle}
                    value={Phone}
                    theme={theme}
                    keyboardType= "number-pad"
                    mode="outlined"
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    label='Salary'
                    style={styles.inputStyle}
                    value={salary}
                    theme={theme}
                    mode="outlined"
                    onChangeText={text => setSalary(text)}
                />
                <Button style={styles.inputStyle} icon={picture==""?"upload":"check"} mode="contained" theme={theme} onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                <Button style={styles.inputStyle} icon="content-save" mode="contained" theme={theme} onPress={() => console.log("save")}>
                    Save
                </Button>
                <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={()=>{setModal(false)}}>
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button icon="camera" theme={theme} mode="contained" onPress={() => pickFromCamera()}>
                                Camera
                            </Button>
                            <Button icon="image-area" theme={theme} mode="contained" onPress={() => pickFromGallery()}>
                                Gallery
                            </Button>
                        </View>
                        <Button theme={theme} onPress={() => setModal(false)}>
                            Cancel
                        </Button>
                    </View>
                </Modal>
            </View>
        );
}

const theme = {
    colors:{
        primary:"#4c57ed"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor: '#e0e0e0'
    },
    inputStyle:{
        margin:5
    },
    modalView: {
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor: "white"
    },
    modalButtonView:{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default CreateEmployee