import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//import TodoListsScreen from '../screen/TodoListsScreen'
import HomeScreen      from '../screen/HomeScreen'
import SignInScreen    from '../screen/SignInScreen'
import SignUpScreen    from '../screen/SignUpScreen'
import SignOutScreen   from '../screen/SignOutScreen'

import { TokenContext, UsernameContext } from '../context/Context'
import TodoStacker from '../screen/TodoStacker'
import { header } from '../components/style/style'

const Tab = createBottomTabNavigator()

export default function Navigation () {
    return (
        <TokenContext.Consumer>
          {([token, setToken]) => (
            <NavigationContainer>
              {token == null ? (
                <Tab.Navigator screenOptions={header}>
                  <Tab.Screen name='SignIn' component={SignInScreen} options={{ title: 'Sign In'}}/>
                  <Tab.Screen name='SignUp' component={SignUpScreen} options={{ title: 'Sign Up'}}/>
                </Tab.Navigator>
              ) : (
                <Tab.Navigator screenOptions={header}>
                  <Tab.Screen name='Home' component={HomeScreen} />
                  <Tab.Screen name='TodoLists' component={TodoStacker} options={{headerShown: false}} />
                  <Tab.Screen name='SignOut' component={SignOutScreen} options={{ title: 'Sign Out'}}/>
                </Tab.Navigator>
              )}
            </NavigationContainer>
          )}
        </TokenContext.Consumer>
      )
}
