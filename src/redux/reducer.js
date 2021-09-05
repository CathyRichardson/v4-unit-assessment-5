
const initialState = {
    username: null,
    profilePic: null
}


const UPDATE_USER = 'UPDATE_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function updateUser(user) {
    const { username, profile_pic } = user;
    return {
        type: UPDATE_USER,
        payload: {
            username: username,
            profilePic: profile_pic
        }
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,
    }
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case UPDATE_USER: {
            const { username, profilePic } = action.payload;
            return {
                username,
                profilePic
            }
        }
        case LOGOUT_USER: {
            return initialState;
        }
        default: return state;
    }
}
