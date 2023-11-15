import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput, FlatList, StyleSheet, Text, View, Button } from 'react-native'

import { TokenContext, UsernameContext } from './context/Context'

import Navigation from './navigation/Navigation'

export default function App() {
	const [token, setToken] = useState(null)
	const [username, setUsername] = useState(null)

  	return (
		<UsernameContext.Provider value={[username, setUsername]}>
      		<TokenContext.Provider value={[token, setToken]}>
    			<Navigation />
      		</TokenContext.Provider>
    	</UsernameContext.Provider>
  	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
