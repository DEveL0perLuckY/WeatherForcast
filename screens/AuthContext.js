// AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    checkUserData();
  }, []);

  const checkUserData = async () => {
    try {
      const storedCountry = await AsyncStorage.getItem("country");
      const storedCity = await AsyncStorage.getItem("city");
      
      if (!storedCountry || !storedCity) {
        setIsNewUser(true);
      }
    } catch (error) {
      console.error("Error checking user data:", error);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        isNewUser,
        setIsNewUser,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
