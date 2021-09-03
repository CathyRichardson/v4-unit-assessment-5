import axios from "axios";

const initialState = {
    username: null,
    profilePic: null
}


const UPDATE_USER = 'UPDATE_USER'
const LOGOUT_USER = 'UPDATE_USER'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,
    }
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case UPDATE_USER + '_FULFILLED': {
            const { username, profilePic } = action.payload.user;
            return {
                username,
                profilePic
            }
        }
        case LOGOUT_USER + '_FULFILLED': {
            return initialState;
        }
        default: return state;
    }
}
