import { API_URL, getHeader } from "./Api"

const Q_TODO_ITEM = `
query Query($where: TodoWhere) {
    todos(where: $where) {
      content
      done
      id
    }
  }
`

export function getAllItems(token, username) {
    return fetch(API_URL, {
        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: Q_TODO_ITEM,
            variables: {
                where: {
                    belongsTo: {
                        owner: {
                            username: username
                        }
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
        return jsonResponse.data.todos
    })
    .catch(error => {

        throw error
    })
}


const Q_TODO =
`
query Query($where: TodoWhere) {
    todos(where: $where) {
        id
        content
        done
    }
}
`

export function getItemsByID(token, id) {

    return fetch(API_URL, {

        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: Q_TODO,
            variables: {
                where: {
                    belongsTo: {
                        id: id
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
        return jsonResponse.data.todos
    })
    .catch(error => {
        throw error
    })
}

const C_TODO_ITEM_AND_LIST = `
mutation CreateTodos($input: [TodoCreateInput!]!) {
    createTodos(input: $input) {
      todos {
        done
        content
        id
      }
    }
  }

`

export function createItemAndList(token, username, content, done, title) {
    return fetch(API_URL, {
        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: Q_TODO_ITEM_ID,
            variables: {
                input: [{
                    content: content,
                    done: true,
                    belongsTo: {
                        create: {
                            owner: {
                                connect: {
                                    where: {
                                        username: username
                                    }
                                }
                            },
                            title: title
                        }
                    }
                }]
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
        return jsonResponse.data.todos
    })
    .catch(error => {

        throw error
    })
}

const C_TODO =
`
mutation Mutation($input: [TodoCreateInput!]!) {
    createTodos(input: $input) {
        todos {
            id
        }
    }
}
`

export function createTodoInList(token, username, listId, content, done) {

    return fetch(API_URL, {

        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: C_TODO,
            variables: {
                input: [
                    {
                        content: content,
                        done: done,
                        belongsTo: {
                            connect: {
                                where: {
                                    id: listId
                                }
                            }
                        }
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
        return jsonResponse.data.todos
    })
    .catch(error => {
            
        throw error
    })
}

const U_TODO =
`
mutation Mutation($where: TodoWhere, $update: TodoUpdateInput, $connect: TodoConnectInput) {
    updateTodos(where: $where, update: $update, connect: $connect) {
        todos {
            id
        }
    }
}
`

export function updateTodoItem(token, username, id, done) {

    return fetch(API_URL, {

        method: 'POST',
        headers: getHeader(token),
        body: JSON.stringify({
            query: U_TODO,
            variables: {
                where: {
                    id: id,
                    belongsTo: {
                        owner: {
                            username: username
                        }
                    }
                },
                update: {
                    done: done
                },
                connect: {
                    belongsTo: {
                        connect: {
                            owner: {
                                where: {
                                    username: username
                                }
                            }
                        }
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
        return jsonResponse.data.todos
    })
    .catch(error => {
            
        throw error
    })
}