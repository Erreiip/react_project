import React, {useState, useEffect, useContext} from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput, FlatList, StyleSheet, Text, View, Button } from 'react-native'

import { TokenContext, UsernameContext } from '../context/Context'

import { getItemsByID, getAllItems, createTodoInList, updateTodoItem, deleteTodoItem } from '../components/TodoItem'

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
			callBack: checkAll
		},
		{
			content: "Tout décocher",
			callBack: uncheckAll
		}
	]

	//CHECKALL
	const checkAll = () => {
		let temp = todos.map(item => {return {id: item.id, content: item.content, done: true }});
		setTodos(temp)
		setNumberTodo(temp.length)
	}

	const uncheckAll = () => {
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
			<Text>Aucune tâches</Text>
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
				onPress={item.callBack}
				/>
			} 
		/>
		<FlatList
				ListEmptyComponent={emptyList}
				data={todos}
				renderItem={({item}) => itemVisible(item)} 
		/>

		{taskView()}

		<Input callBack={addNewTodo} title="ajouter"/>
		</View>
	)
}
