import React, {useState, useEffect, useContext} from 'react';
import { TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch, FlatList } from 'react-native';


export default function Input (props) {
    const [text, setText] = useState("")

    const callBack = () => {
        props.callBack(text)
        setText("")
    }

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    placeholder='Titre'
                    value={text}
                    onChangeText={txt => setText(txt)}
                />
            </View>
            <Button 
                style={styles.button}
                onPress={callBack}
                title={props.title}
            />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 4,
        flexDirection: 'row',
		alignItems: 'center',
        justifyContent: 'center',
	},
    input: {
        backgroundColor: "aliceblue",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black",
        flex:3
    },
    button: {
        flex:1
    }
})