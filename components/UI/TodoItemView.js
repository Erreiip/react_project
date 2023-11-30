import React, {useState, useEffect} from 'react';
import { ScrollView, TouchableOpacity, Image, Text, View, StyleSheet, Switch } from 'react-native';

export default function TodoItem(props){

    const [done, onToogled] = useState(props.item.done);
    const toggleSwitch = () => {
        props.changeSwitch(props.item)
        onToogled(!done);
        props.setCountTodo(done);
    }

    useEffect(() => {
        onToogled(props.item.done)
    }, [props.item.done])

    return (
        <View style={styles.container}> 
            <View style={styles.content}> 
            <Switch
                value={done}
                onValueChange={toggleSwitch}
            />
            </View>
            <View style={styles.content}> 
                <Text style={{textDecorationLine: done ? 'line-through' : 'none'}}>
                    {props.item.content}
                </Text>
            </View>
            <View style={styles.content}> 
            <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                <Image
                    style={styles.trashIcon}
                    source={require('../../assets/trash.png')}
                />
            </TouchableOpacity>
            </View>
        </View>
    );
};

const LIST_HEIGHT = 40;

const styles = StyleSheet.create({
    container: {

        display: 'flex',

        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 5,
        paddingBottom: 5,
        paddingTop: 5,

        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    content: {

        flex: 1,
        flexDirection: 'column',

        justifyContent: 'center',
        alignItems: 'center',

        height: LIST_HEIGHT,
        width: '33%'
    },
    trashIcon: {

        height: LIST_HEIGHT,
        width: LIST_HEIGHT,

        backgroundColor : 'red',
        borderRadius: 10,
    }
    
});