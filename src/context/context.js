import { getUserByToken } from "../apis/user";
import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();
export const UserDispatchContext = createContext();

const initialUser = {
  id: "",
  nickname: "",
};

function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      console.log(payload);
      return payload;
    case "LOGOUT":
      return initialUser;
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

export const ContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initialUser);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && user.id === "") {
      getUserByToken(token).then((data) =>
        userDispatch({ type: "LOGIN", payload: data.id })
      );
    }
  }, [token, user.id]);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={userDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
