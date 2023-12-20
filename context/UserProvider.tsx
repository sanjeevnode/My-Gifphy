"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useAuthContext } from "./AuthContextProvider";
import { getFavorites } from "@/lib/actions/user.actions";

interface User {
  userId: string;
  gifs: string[];
}

interface ContextProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}
interface props {
  children: ReactNode;
}
const UserContext = createContext<ContextProps | undefined>(undefined);

export const UserProvider: React.FC<props> = ({ children }) => {
  const { user } = useAuthContext() || {};
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      // Initialize currentUser with user.uid
      setCurrentUser({ userId: user.uid, gifs: [] });

      // Call getFavorites and initialize gifs
      getFavorites(user.uid).then((gifs) => {
        setCurrentUser((currentUser: User | null) => ({
          ...currentUser!,
          gifs: gifs,
        }));
      });
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
