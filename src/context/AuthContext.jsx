import { createContext, useReducer } from "react";
import FilesData from "../data/FilesData";

const AuthContext = createContext();

const initalState = {
  accessToken: null,
};

function reducer(state, action) {
  if (action.type === "setToken") {
    state = { ...state, accessToken: action.payload };
  }
  return state;
}

export const AuthProvider = ({ children, defaultState = initalState }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
