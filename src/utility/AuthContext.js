import React, { useEffect, useState } from 'react';
import myApp from '../FirebaseConfig';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    // myApp.auth().onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   console.log("User" , user)
    //   setPending(false);
    // });
    console.log("befor state" , localStorage.getItem('ownertype') )
    setCurrentUser(localStorage.getItem('token'));
    setPending(false);
  }, [setCurrentUser]);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
