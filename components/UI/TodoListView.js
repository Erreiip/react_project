import React, {useState, useEffect, useContext} from 'react';
import { Alert, Modal, Pressable, TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch, FlatList } from 'react-native';

import { stylesTDL, modalS } from '../style/style';
export default function TodoListView (props) {

    const [name, setName] = useState("")
    const [modalVisible, setModalVisible] = useState(false);

    const changeModalState = () => {
        setModalVisible(!modalVisible)
    }

    const changeName = () => {
        if ( name != "") {
            props.modalCallBack(props.item.id, name)
            changeModalState()
        } else {
            Alert.alert("Name error", "Name must contains 1 letter")
        }
    }

    const modal = () => {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={changeModalState}
            >
                <View style={modalS.centeredView}>
                    <View style={modalS.modalView}>

                        <Text style={modalS.modalText}>Actual name : {props.item.title}</Text>
                        <TextInput 
                            style={modalS.modalText}
                            onChangeText={txt => setName(txt)}
                        />
                        
                        <Pressable
                            style={[modalS.button, modalS.buttonSave]}
                            onPress={changeName}
                        >
                            <Text style={modalS.textStyle}>Save</Text>
                        </Pressable>

                        <Pressable
                            style={[modalS.button, modalS.buttonClose]}
                            onPress={changeModalState}
                        >
                            <Text style={modalS.textStyle}>Close without save</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View style={stylesTDL.container}>
            {modal()}
            <TouchableOpacity
                onPress={() => props.navigate(props.item.id)}
                onLongPress={changeModalState}
            >
                <Text>{props.item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.callBack(props.item.id)}
            >
                <Image 
                    source={require('../../assets/trash.png')} 
                    style={stylesTDL.logo}
                />
            </TouchableOpacity>
        </View>
    )
}
