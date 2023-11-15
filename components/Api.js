export const API_URL = 'http://graphql.unicaen.fr:4000/'

export function getHeader(token) {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}