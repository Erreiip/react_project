import React, {useState, useEffect, useContext} from 'react';
import { TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

export default function TaskView (props) {
    let numberDone = props.array.filter((item)=>item.done).length
    let pourcent = (numberDone*1.0)/props.array.length

    return (
        <View>
            <Text>Progression des tâches</Text>
            <Progress.Bar progress={pourcent} />
        </View>
    )
}