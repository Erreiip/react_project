import React, {useState, useEffect, useContext} from 'react';
import { TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch } from 'react-native';

import { TokenContext, UsernameContext } from '../context/Context';

import { signIn } from '../components/SignIn'

import { styles, header } from '../components/style/style';

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
        </View>
    )
}