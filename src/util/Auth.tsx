import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { User } from "firebase/auth";

export type UserType = {
    user: User | null,
    setUser: (user: User | null) => void
}

export const UserContext = React.createContext<UserType | null>(null);

export const useUserContext = () => React.useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // console.log("AuthProvider: currentUser = " + user);
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <>Loading...</>
    }

    return (
        <UserContext.Provider
            value={{
                user: currentUser,
                setUser: setCurrentUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};