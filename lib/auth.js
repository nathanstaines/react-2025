import { createContext, useContext, useEffect, useState } from 'react';

import Router from 'next/router';
import cookie from 'js-cookie';
import { createUser } from './db';
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
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('react-2025-auth', true, {
        expires: 1,
      });

      setLoading(false);

      return user;
    } else {
      setUser(null);

      cookie.remove('react-2025-auth');

      setLoading(false);

      return;
    }
  };

  const signInWithGitHub = (redirect) => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => {
        handleUser(res.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signInWithGoogle = (redirect) => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        handleUser(res.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser();

        Router.push('/');
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    loading,
    user,
    signInWithGitHub,
    signInWithGoogle,
    signOut,
  };
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId,
    token: await user.getIdToken(),
  };
};
