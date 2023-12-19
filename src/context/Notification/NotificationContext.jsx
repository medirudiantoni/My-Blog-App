import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  notifications: [],
};

export const NotificationContext = createContext(initialState);

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState);
  
    const addNotification = (notification) => {
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    };
  
    const removeNotification = (id) => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    };
  
    return (
      <NotificationContext.Provider
        value={{ notifications: state.notifications, addNotification, removeNotification }}
      >
        {children}
      </NotificationContext.Provider>
    );
  };

// const useNotification = () => {
//   return useContext(NotificationContext);
// };

export default NotificationProvider;