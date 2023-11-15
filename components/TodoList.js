import { API_URL, getHeader } from "./Api"

const Q_TODO_LIST =
    `query TodoLists($where: TodoListWhere) {
        todoLists(where: $where) {
          id
          title
        }
      }
    `

const C_TODO_LIST =
    `mutation createTodoLists($input: [TodoListCreateInput!]!) {
        createTodoLists(input: $input) {
          todoLists {
            id
            owner {
              username
            }
            title
          }
        }
      }
    `

const D_TODO_LIST =
    `mutation Mutation($where: TodoListWhere, $delete: TodoListDeleteInput) {
      deleteTodoLists(where: $where, delete: $delete) {
        nodesDeleted
      }
    }
    `

export function createTodoLists(token, username, title) {

    return fetch(API_URL, {
        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: C_TODO_LIST,
            variables: {
                input :[
                    {
                        owner: {
                            connect: {
                                where: {
                                    username: username
                                }
                            }
                        },
                        title: title
                    }
                ]
            }
        })
    })
    .then(response => {
        return response.json()
    })
    .then(jsonResponse => {
        if (jsonResponse.errors != null) {
            throw jsonResponse.errors[0]
        }
        return jsonResponse.data.createTodoLists
    })
    .catch(error => {
        throw error
    })
}

export function getTodoLists(token, username) {

    return fetch(API_URL, {
        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: Q_TODO_LIST,
            variables: {
                where: {
                    owner: {

                        username: username
                    }
                }
            }
        })
    })
    .then(response => {
        return response.json()
    })
    .then(jsonResponse => {

        if (jsonResponse.errors != null) {
            throw jsonResponse.errors[0]
        }
        return jsonResponse.data.todoLists
    })
    .catch(error => {

        throw error
    })
}

export function deleteTodoLists(token, username, id) {
    return fetch(API_URL, {
        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: D_TODO_LIST,
            variables: {
                where: {
                    owner: {
                        username: username
                    },
                    id: id
                }
            } 
        })
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.deleteTodoLists
    })
    .catch(error => {
      throw error
    })
}