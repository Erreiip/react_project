import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoItems from './TodoItemsScreen';
import TodoListScreen from './TodoListScreen';
import { styles, header } from '../components/style/style';

const Stack = createNativeStackNavigator();

export default function TodoStacker() {
  return (
    <Stack.Navigator
      screenOptions={header}
    >
      <Stack.Screen 
        name="TodoLists" 
        component={TodoListScreen} 
        options={{ title: 'Todo List' }}
      />
      <Stack.Screen 
        name="TodoItems"
        component={TodoItems}
        options={{ title: 'Todo Items' }}
      />
    </Stack.Navigator>
  );
}