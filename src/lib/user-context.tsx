import { createContext, type JSX, useContext } from "solid-js";
import { SessionData } from "./auth/session";

const UserContext = createContext<SessionData | null | undefined>(null);

export function UserContextProvider(props: {
  value: SessionData | null | undefined;
  children: JSX.Element;
}) {
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const value = useContext(UserContext);

  return value;
}
