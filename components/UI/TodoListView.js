import React, {useState, useEffect, useContext} from 'react';
import { TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch, FlatList } from 'react-native';

export default function TodoListView (props) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => props.navigate(props.item.id)}
            >
                <Text>{props.item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.callBack(props.item.id)}
            >
                <Image 
                    source={require('../../assets/trash.png')} 
                    style={styles.logo}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
        flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
    logo: {
        paddingLeft: 0,
        width: 25,
        height: 25,
    }
})