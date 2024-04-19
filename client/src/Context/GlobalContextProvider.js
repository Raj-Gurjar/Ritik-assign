import React from "react";
import { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import AOS from "aos";
import "aos/dist/aos.css";

const GlobalContextProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const PORT = 8080;

  const PORT_Url = `http://localhost:${PORT}`;

  const logInApi = `${PORT_Url}/user/signin`;
  const signUpApi = `${PORT_Url}/user/signup`;

  const allBooks = `${PORT_Url}/books/allBooks`;
  const addBook = `${PORT_Url}/books/add`;
  const getBook = `${PORT_Url}/books/`;

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logInApi,
        signUpApi,
        allBooks,
        addBook,
        getBook,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
