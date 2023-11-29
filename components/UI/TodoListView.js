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
        <TouchableOpacity
                onPress={() => props.navigate(props.item.id)}
                onLongPress={changeModalState}
            >
            <View style={StyleTodoListView.todoListContainer}>
                {modal()}
                <Text style={StyleTodoListView.todoListText}>{props.item.title}</Text>
                <TouchableOpacity
                    onPress={() => props.callBack(props.item.id)}
                    style={StyleTodoListView.trashIconPosition}
                >
                    <Image 
                        source={require('../../assets/trash.png')}
                        style={StyleTodoListView.trashIcon}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const TODO_LIST_HEIGHT = 50;
const TODO_LIST_PADDING = 10;

const StyleTodoListView = StyleSheet.create({

    todoListContainer: {

        width: '90%',
        height: TODO_LIST_HEIGHT,
        flexDirection: 'row',

        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,

        alignSelf: 'center',

        padding: 10,
        marginTop: 10,
    },
    trashIconPosition: {

        position: 'absolute',
        right: 10,
    },
    trashIcon: {

        height: TODO_LIST_HEIGHT - (TODO_LIST_PADDING * 2),
        width: TODO_LIST_HEIGHT - (TODO_LIST_PADDING * 2),

        backgroundColor : 'red',
        borderRadius: 10,


    },
    todoListText: {

        fontSize: 20,

    },  
})
