import { createContext, useEffect, useState } from "react";
const StateContext = createContext();
export default StateContext;
export const StateProvider = ({ children }) => {
  const [navHeight, setNavHeight] = useState(0);
  const [justRegistered, setJustRegistered] = useState(false);
  const contextData = {
    nav: [navHeight, setNavHeight],
    just_registered: [justRegistered, setJustRegistered],
  };
  return (
    <StateContext.Provider value={contextData}>
      {children}
    </StateContext.Provider>
  );
};
