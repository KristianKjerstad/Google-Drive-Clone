import React, { useContext, useEffect, useState } from 'react'

import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from '../firebase';

type TAuth = {
    currentUser: User | null
    signup: (email: string, password: string) => void
}
const AuthContext = React.createContext<TAuth>({ currentUser: null, signup: () => { } })




export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: JSX.Element }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)


    function signup(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value: TAuth = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}