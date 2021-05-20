import React, { useState } from 'react';

const AuthContext = React.createContext({
    userinfo: {},
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    userinfofunc: (usrinf) => {}
});

export const AuthContextProvider = (props) => {
  const [loggedin, setloggedin] = useState(false);
  const [userinfo, setuserinfo] = useState();

  const loginHandler = () => {
    setloggedin(true);
  };

  const logoutHandler = () => {
    setloggedin(false);
  };
  const userinfohandler = (usrinf) => {
      setuserinfo(usrinf);
  }

  const contextValue = {
    isLoggedIn: loggedin,
    login: loginHandler,
    logout: logoutHandler,
    userinfofunc: userinfohandler,
    userinfo: userinfo
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;