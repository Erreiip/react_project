import React, {useState, useEffect, useContext} from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Switch } from 'react-native';
import { TokenContext, UsernameContext } from '../context/Context';
import { Button } from 'react-native-web';

import { styles, header } from '../components/style/style';

export default function SignOuScreen ({ navigation }) {
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken] = useContext(TokenContext)
    
    const resetToken = () => {
        setToken(null)
        setUsername(null)
    }

    return (
        <View>
            <Button
                title="Sign out"
                onPress={resetToken}
            />
        </View>
    )
}