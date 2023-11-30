import React, {useState, useEffect, useContext} from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput, FlatList, StyleSheet, Text, View, Button, Clipboard } from 'react-native'

import { TokenContext, UsernameContext } from '../context/Context'

import { getItemsByID, getAllItems, createTodoInList, updateTodoItem, deleteTodoItem } from '../components/TodoItem'
import { getTodoLists } from '../components/TodoList'

import TodoItem from '../components/UI/TodoItemView'
import Input from '../components/UI/Input'
import TaskView from '../components/UI/TaskView'

import { styles, header } from '../components/style/style'

export default function TodoItemsScreen({ navigation, route }) {

	const [username, setUsername] = useContext(UsernameContext)
	const [token, setToken] = useContext(TokenContext)

	const id = route.params.id

	const [todos, setTodos] = useState([])

	useEffect(() => {
		updateTodoItems()
		setNumberTodo(todos.filter((item)=>item.done).length)
	}, [])

	const updateTodoItems = () => {

		getItemsByID(token, id).then((data) => {
			setTodos(data)
		})
	}

	// DISPLAY FUNCTION
	const displayAll = () => {
		setMode(MODE_ALL)
	}

	const displayInProgress = () => {
		setMode(MODE_ENCOURS)
	}

	const displayFinish = () => {
		setMode(MODE_FINIS)
	}

	//BUTTONS DATA
	const buttonsData = [
		{
			content: "Tous",
			callBack: displayAll
		},
		{
			content: "En cours",
			callBack: displayInProgress
		},
		{
			content: "Finito",
			callBack: displayFinish
		},
		{
			content: "Tout cocher",
			callBack: () => {
		
				let temp = todos.filter((item)=>!item.done)
		
				for (let i = 0; i < temp.length; i++) {
					updateTodoItem(token, username, id, temp[i].id, true).then((data) => {
						updateTodoItems()
					})
				}
			}
		},
		{
			content: "Tout décocher",
			callBack: () => {
		
				let temp = todos.filter((item)=>item.done)
		
				for (let i = 0; i < temp.length; i++) {
					updateTodoItem(token, username, id, temp[i].id, false).then((data) => {
						updateTodoItems()
					})
				}
			}
		}
	]

	const uncheckAll = () => {

		console.log("Uncheck");

		let temp = todos.map(item => {return {id: item.id, content: item.content, done: false }})
		setTodos(temp)
		setNumberTodo(0)
	}

	//MODE
	const MODE_ALL = 'All'
	const MODE_ENCOURS = 'Encours'
	const MODE_FINIS = 'Finis'
	const [mode, setMode] = useState(MODE_ALL)

	// NUMBER OF TODOS
	const [numberTodo, setNumberTodo] = useState(0)

	const setCountTodo = (done) => {
		setNumberTodo( numberTodo + (done ? -1 : 1))
	}

	// DELETE TO DO
	const deleteTodo = (id) => {
		
		deleteTodoItem(id, token).then((data) => {
			updateTodoItems()
		})
	}

	//CHANGE SWITCH
	const changeSwitch = (item) => {

		updateTodoItem(token, username, id, item.id, !item.done).then((data) => {
			console.log(data);
			updateTodoItems()
		})
	}

	// ADD TO DO
	const addNewTodo = (title) => {

		createTodoInList(token, username, id, title, false).then((data) => {
			updateTodoItems()
		})
	}

	const emptyList = () => {

		return (
			<View style={styles.centerContent}>
				<Text>Aucune tâches</Text>
			</View>
		)
	}

	const taskView = () => {

		if ( todos.length != 0 && mode == MODE_ALL ) {

			return(
				<TaskView array={todos}/>
			)
		}
	}

	const itemVisible = (item) => {

		let ret = <TodoItem item={item} setCountTodo={setCountTodo} deleteTodo={deleteTodo} changeSwitch={changeSwitch}/>

		if ( mode == MODE_ALL     ) { return ret }
		if ( mode == MODE_ENCOURS && !item.done) { return ret }
		if ( mode == MODE_FINIS   &&  item.done) { return ret }
	}

	let pourcent = (numberTodo * 1.0)/todos.length
	if ( numberTodo == 0 || todos.length == 0) pourcent = 0

	let numColumns = Math.ceil(buttonsData.length/2)

	const exportJSON = () => {

		getAllItems(token, username).then((data) => {

			getTodoLists(token, username).then((data2) => {

				let title = data2.filter((item)=>item.id == id)[0].title

				let json = {
					title: title,
					items: data.map((item) => {
						return {
							content: item.content,
							done: item.done
						}
					})
				}

				let string = JSON.stringify(json)

				// Clipboard
				Clipboard.setString(string)
			})
		})
	}

	return (
		<View style={styles.container}>
		<FlatList
			numColumns={numColumns}
			data={buttonsData}
			columnWrapperStyle={() => <View style={{width: 10}} />}
			ItemSeparatorComponent={() => <View style={{height: 10}} />}
			renderItem={({item}) => 
				<Button
					title={item.content}
					onPress={() => {item.callBack()}}
				/>
			} 
		/>
		<FlatList
				style={{width:'90%'}}
				ListEmptyComponent={emptyList}
				data={todos}
				renderItem={({item}) => itemVisible(item)} 
		/>

		{taskView()}

		<Input callBack={addNewTodo} title="ajouter"/>
		<Button title='Exporter au format JSON' onPress={() => exportJSON()}/>
		</View>
	)
}
