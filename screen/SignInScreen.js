import React, {useState, useEffect, useContext} from 'react';
import { TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch } from 'react-native';

import { TokenContext, UsernameContext } from '../context/Context';

import { signIn } from '../components/SignIn'
import { signUp } from '../components/SignUp';

import { styles, header } from '../components/style/style';
import { createTodoLists, deleteTodoLists, getTodoLists } from '../components/TodoList';
import { createTodoInList, getItemsByID, updateTodoItem } from '../components/TodoItem';

export default function SignInScreen ({ navigation }) {
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken] = useContext(TokenContext)

    const [textUsername, setTextUsername] = useState("")
    const [textPassword, setTextPassword] = useState("")

    const connection = () => {
        signIn(textUsername, textPassword).then(
            (res) => {
                setToken(res)
                setUsername(textUsername)
            }
        ).catch(error => {
            alert(error["message"])
        })
    }

    const navigateToSignUp = () => {
        navigation.navigate("SignUp")
    }

    return (
        <View>
            <TextInput
                placeholder="Username"
                onChangeText={txt => setTextUsername(txt)}
            />
            <TextInput 
                placeholder="Password"
                onChangeText={txt => setTextPassword(txt)}
                secureTextEntry={true}
            />
            <Button
                onPress={connection}
                title="Submit"
                color="#f194ff"
            />
            <Button
                onPress={navigateToSignUp}
                title="go to sign up"
            />
            <Button
                onPress={
                    () => {
                        // Random 20 char string
                        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                        console.log(randomString);
                        signUp(randomString, randomString).then(
                            (res) => {
                                const sheshToken = res

                                createTodoLists(sheshToken, randomString, randomString).then(
                                    (res) => {
                                        const listId = res.todoLists[0].id
                                        console.log(listId);

                                        createTodoInList(sheshToken, randomString, listId, randomString, false).then(
                                            (res) => {
                                                getItemsByID(sheshToken, listId).then(
                                                    (res) => {
                                                        const itemId = res[0].id
                                                        console.log(itemId);

                                                        updateTodoItem(sheshToken, randomString, listId, itemId, true).then(
                                                            (res) => {
                                                                alert("J'ai fait caca dans la base de donnée")
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                }
                title="Baise moi cette base de donnée"
            />
            <Button 
                onPress={
                    () => {
                        // Random 20 char string
                        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                        console.log(randomString);
                        signUp(randomString, randomString).then(
                            (res) => {
                                const sheshToken = res

                                createTodoLists(sheshToken, randomString, randomString).then(
                                    (res) => {
                                        const listId = res.todoLists[0].id
                                        console.log(listId);

                                        createTodoInList(sheshToken, randomString, listId, randomString, false).then(
                                            (res) => {
                                                getItemsByID(sheshToken, listId).then(
                                                    (res) => {
                                                        const itemId = res[0].id
                                                        console.log(itemId);

                                                        updateTodoItem(sheshToken, randomString, listId, itemId, true).then(
                                                            (res) => {
                                                                
                                                                let bool = true
                                                                let i = 0

                                                                let nextRequest = false

                                                                while (bool) {

                                                                    if (!nextRequest) {
                                                                        nextRequest = true
                                                                        getTodoLists(sheshToken, randomString).then(
                                                                            (res) => {

                                                                                if (res.length == 0) {
                                                                                    bool = false
                                                                                }
                                                                                res.forEach(element => {
                                                                                    deleteTodoLists(sheshToken, randomString, element.id)
                                                                                    i++
                                                                                    if (i % 1000 == 0) {
                                                                                        
                                                                                        console.log(i);
                                                                                    }
                                                                                });
                                                                                nextRequest = false
                                                                            }
                                                                        )
                                                                    }
                                                                }
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                }
                title='DROP LES LISTES'
            />
        </View>
    )
}