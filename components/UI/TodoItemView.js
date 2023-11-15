import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Switch } from 'react-native';

export default function TodoItem(props){

    const [done, onToogled] = useState(props.item.done);
    const toggleSwitch = () => {
        props.changeSwitch(props.item.id)
        onToogled(!done);
        props.setCountTodo(done);
    }

    useEffect(() => {
        onToogled(props.item.done)
    }, [props.item.done])

    return (
        <View style={styles.content}> 
            <Switch
                value={done}
                onValueChange={toggleSwitch}
            />
            <Text style={   
                            [styles.text_item, 
                            {textDecorationLine: done ? 'line-through' : 'none'}
                        ]}>
                {props.item.content}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => props.deleteTodo(props.item.id)}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/trash.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContents: 'space-around',
        marginBottom: 5,
    },
    text_item: {
        paddingLeft: 50,
        paddingRight: 50,
    },
    logo: {
        paddingLeft: 50,
        width: 40,
        height: 40,
    }
});