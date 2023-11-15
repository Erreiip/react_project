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


const Q_TODO_ITEM_ID = `
query Todos($where: TodoWhere, $belongsToWhere2: TodoListWhere) {
    todos(where: $where) {
      done
      content
      belongsTo(where: $belongsToWhere2) {
        id
      }
    }
  }
`

export async function getItemsByID(token, username, id) {
    let promise = fetch(API_URL, {
            method: 'POST',
            headers: getHeader(token),
            body: JSON.stringify({
                query: Q_TODO_ITEM_ID,
                variables: {
                    where: {
                        belongsTo: {
                        owner: {
                            username: username
                        }
                        }
                    },
                    belongsToWhere2: {
                        id: id
                    }
                }
            })
        })
        .then(response => {

            return response.json()
        })
    
    let response = promise.then(jsonResponse => {

        if (jsonResponse.errors != null) {
            throw jsonResponse.errors[0]
        }
        return jsonResponse.data.todos
    })
    .catch(error => {

        throw error
    })

    return await response
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