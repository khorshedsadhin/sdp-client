import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { buildDemoUser, getStoredUser, setStoredUser } from '../mocks/demoAuth';

// Frontend-only demo auth (no Firebase). Any email/password is accepted —
// the email decides the role (see roleForEmail in demoData):
//   admin@demo.com -> admin, tutor@demo.com -> tutor, anything else -> student.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email) => {
    setLoading(true);
    const demoUser = setStoredUser(buildDemoUser({ email }));
    setUser(demoUser);
    setLoading(false);
    return { user: demoUser };
  };

  const signIn = async (email) => {
    setLoading(true);
    const demoUser = setStoredUser(buildDemoUser({ email }));
    setUser(demoUser);
    setLoading(false);
    return { user: demoUser };
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const demoUser = setStoredUser(
      buildDemoUser({ email: 'demo.user@demo.com', displayName: 'Demo Google User' })
    );
    setUser(demoUser);
    setLoading(false);
    return { user: demoUser };
  };

  const logOut = async () => {
    setLoading(true);
    setStoredUser(null);
    setUser(null);
    setLoading(false);
  };

  const updateUserProfile = async (name, photo) => {
    setUser((prev) => {
      const next = { ...(prev || {}), displayName: name, photoURL: photo };
      setStoredUser(next);
      return next;
    });
  };

  // Restore any previously "logged-in" demo user on first load.
  useEffect(() => {
    setUser(getStoredUser());
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
