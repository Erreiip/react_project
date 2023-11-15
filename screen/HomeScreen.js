import React, {useState, useEffect, useContext} from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Switch } from 'react-native';

import { TokenContext, UsernameContext } from '../context/Context';

import { styles, header } from '../components/style/style';

export default function HomeScreen ({ navigation }) {
    const [username, setUsername] = useContext(UsernameContext)
    
    return (
        <View style={styles.container}>
            <Text>Connnecté en tant que {username}</Text>
        </View>
    )
}