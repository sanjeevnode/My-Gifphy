"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { auth } from "@/app/firebase/config";

import Image from "next/image";

interface AuthContextType {
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = (): AuthContextType | undefined =>
  useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setLoading }}>
      {loading ? (
        <div className="w-screen min-h-screen flex justify-center items-center">
          <Image
            alt="logo"
            src="/logo-big.png"
            width={100}
            height={100}
            className="animate-logo"
          />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
