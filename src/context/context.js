import { getUserByToken } from "../apis/user";
import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();
export const UserDispatchContext = createContext();

const initialUser = {
  userId: "",
  nickName: "",
};

function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return payload;
    case "LOGOUT":
      return initialUser;
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

export function ContextProvider({ children }) {
  const [user, userDispatch] = useReducer(userReducer, initialUser);
  const Authorization = localStorage.getItem("Authorization")
    ? localStorage.getItem("Authorization")
    : sessionStorage.getItem("Authorization");

  useEffect(() => {
    if (Authorization && user.userId === "") {
      getUserByToken(Authorization).then((data) =>
        userDispatch({ type: "LOGIN", payload: data.user })
      );
    }
  }, [Authorization, user.userId]);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={userDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
