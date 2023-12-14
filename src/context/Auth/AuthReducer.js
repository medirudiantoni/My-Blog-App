const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                currentUserData: action.payload,
                currentUser: true
            };
        }
        case "LOGOUT": {
            return {
                currentUserData: null,
                currentUser: false
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;