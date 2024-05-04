import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({
  userToken: null,
  encryptionKey: null,
  walletId: null,
  userId: null,
  setData: () => {},
  updateWalletId: () => {},
  logout: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [uId, setUId] = useState(null);
  const [walletId, setWalletId] = useState(null);

  useEffect(() => {
    // Check if user data and token are available in localStorage on initial load
    const userToken = localStorage.getItem('userToken');
    const encryptionKey = localStorage.getItem('encryptionKey');
    const walletId = localStorage.getItem('walletId');
    const userId = localStorage.getItem('uId');
    if (userToken && encryptionKey && userId || walletId) {
      setUserToken(userToken);
      setEncryptionKey(encryptionKey);
      setWalletId(walletId);
      setUId(userId);
    }
  }, []);

  const setData = (userToken, encryptionKey, uId, walletId) => {
    // Save user data and token to localStorage when user logs in
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('encryptionKey', encryptionKey);
    localStorage.setItem('walletId', walletId);
    localStorage.setItem('uId', uId);
    setUserToken(userToken);
    setEncryptionKey(encryptionKey);
    setWalletId(walletId);
    setUId(uId);
  }

  const updateWalletId = (walletId) => {

    localStorage.setItem('walletId', walletId);

    setWalletId(walletId);

  }
  const updateUserId = (uId) => {

    localStorage.setItem('uId', uId);

    setWalletId(uId);

  }

  const logout = () => {
    // Remove user data and token from localStorage when user logs out
    localStorage.removeItem('userToken');
    localStorage.removeItem('encryptionKey');
    localStorage.removeItem('walletId');
    localStorage.removeItem('userId');
    setUserToken(null);
    setEncryptionKey(null);
    setWalletId(null); 
    setUId(null);
  }

  return (
    <UserContext.Provider value={{ userToken, encryptionKey, uId, walletId, setData,updateUserId, updateWalletId, logout, uId }}>
      {children}
    </UserContext.Provider>
  );
};
