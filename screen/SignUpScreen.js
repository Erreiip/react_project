import React, {useState, useEffect, useContext} from 'react';
import { TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch } from 'react-native';

import { TokenContext, UsernameContext } from '../context/Context';

import { signUp } from '../components/SignUp'

import { styles, header } from '../components/style/style';

export default function SignUpScreen ({ navigation }) {
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken]       = useContext(TokenContext)

    const [textUsername, setTextUsername] = useState("")
    const [textPassword, setTextPassword] = useState("")

    const connection = () => {
        signUp(textUsername, textPassword).then(
            (res) => {
                setToken(res)
                setUsername(textUsername)
            }
        ).catch(error => {
            alert(error["message"])
        })
    }

    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
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
                onPress={navigateToSignIn}
                title="go to sign in"
            />
        </View>
    )
}