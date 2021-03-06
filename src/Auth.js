import React, { useEffect, useState } from 'react';
import firebase from './Firebase';
// import "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider 
    value={{
      currentUser
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
