export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        id: Date.now(),
        text
    }
}

export function toggleTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}