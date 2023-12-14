import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    currentUserData: null,
    currentUser: false
};

export const AuthContext = createContext(INITIAL_STATE);


export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{ currentUserData: state.currentUserData, currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
