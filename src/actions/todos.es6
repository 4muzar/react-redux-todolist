let todoID = 0;

export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        id: todoID++,
        text
    }
}

export function toggleTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}