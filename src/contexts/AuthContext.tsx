import React, { useContext, useEffect, useState } from 'react'

import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from '../firebase';
import { child } from 'firebase/database';

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
    const [loading, setLoading] = useState<boolean>(true)


    function signup(email: string, password: string) {
        createUserWithEmailAndPassword(auth, email, password)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
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
            {!loading && children}
        </AuthContext.Provider>
    )
}