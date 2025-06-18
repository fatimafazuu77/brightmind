import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserDetailContext = createContext();

// Custom hook to use the context
export const useUserDetails = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUserDetails must be used within a UserDetailsProvider');
  }
  return context;
};

// Provider component
export const UserDetailProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
    profileImage: null,
    isAuthenticated: false,
  });

  // Function to update user details
  const updateUserDetails = (newDetails) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      ...newDetails,
    }));
  };

  // Function to clear user details (for logout)
  const clearUserDetails = () => {
    setUserDetails({
      id: null,
      name: '',
      email: '',
      role: '',
      profileImage: null,
      isAuthenticated: false,
    });
  };

  // Value object to be provided by the context
  const value = {
    userDetails,
    updateUserDetails,
    clearUserDetails,
  };

  return (
    <UserDetailContext.Provider value={value}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default UserDetailContext;
