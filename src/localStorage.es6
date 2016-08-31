export function loadState() {
    try {
        let state = window.localStorage.getItem('state');
        if (state === null) {
            return undefined;
        }
        return JSON.parse(state);
    } catch(error) {
        return undefined;
    }
}

export function saveState(state) {
    try {
        window.localStorage.setItem('state', JSON.stringify(state));
    } catch(error) {

    }
}