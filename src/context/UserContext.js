import React from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = React.useState(
    () => JSON.parse(window.localStorage.getItem("user"))
  );

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
}

export default Context;