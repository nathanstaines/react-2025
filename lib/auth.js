import { createUser } from './db';
import React, { createContext, useContext, useEffect, useState } from 'react';

import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setUser(user);

      return user;
    } else {
      setUser(null);

      return;
    }
  };

  const signInWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => handleUser(res.user));
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser());
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGitHub,
    signOut,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
