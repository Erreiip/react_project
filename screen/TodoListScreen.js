import React, {useState, useEffect, useContext} from 'react';
import { StatusBar, TextInput, Button, TouchableOpacity, Image, Text, View, StyleSheet, Switch, FlatList } from 'react-native';

import { TokenContext, UsernameContext } from '../context/Context';

import { deleteTodoLists, getTodoLists, createTodoLists, updateTodoLists } from '../components/TodoList'

import Input from '../components/UI/Input';
import TodoListView from '../components/UI/TodoListView';
import TaskView from '../components/UI/TaskView';
import { getAllItems } from '../components/TodoItem';

import { styles, header } from '../components/style/style';

export default function TodoListScreen ({ navigation, route }) {
    
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken] = useContext(TokenContext)

    const [data, setData] = useState([])
    const [todos, setTodos] = useState([])

    useEffect(() => {
        updateTodoList()
    }, [])

    useEffect(() => {
        updateTodoItem()
    }, [data])

    const updateTodoList = () => {
        getTodoLists(token, username).then((res) => {
            setData(res)
            // for (let i = 0; i < res.length; i++) {deleteTodoLists(token, username, res[i].id)}
        })
    }

    const updateTodoListsName = (id, title) => {
        updateTodoLists(token, username, id, title).then(() => {
            updateTodoList()
        })
    }

    const updateTodoItem = () => {
        getAllItems(token, username).then((res) => setTodos(res))
    }
    
    const createTodoList = (title) => {
        createTodoLists(token, username, title).then(() => {
            updateTodoList()
        })
    }

    const deleteTodoList = (id) => {
        deleteTodoLists(token, username, id).then(() => {
            updateTodoList()
        })
    }

    const navigateItems = (id) => {
        navigation.navigate("TodoItems", {id: id})
    }

    const emptyList = () => {
        return (
          <Text>Aucune Liste</Text>
        )
      }
    
      const taskView = () => {
        if ( todos.length != 0)
        return(
          <TaskView array={todos}/>
        )
      }

    return (
        <View style={styles.container}>
            <FlatList
                ListEmptyComponent={emptyList}
                data={data}
                renderItem={({item}) => <TodoListView item={item} callBack={deleteTodoList} modalCallBack={updateTodoListsName} navigate={navigateItems}/>}
            />

            {taskView()}

            <Input callBack={createTodoList} title="ajouter"/>
        </View>
    )
}

