import React, { useContext, useEffect, useState } from 'react'

import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from '../firebase';
import { child } from 'firebase/database';

type TAuth = {
    currentUser: User | null
    signup: (email: string, password: string) => void
    login: (email: string, password: string) => void
    logout: () => void
    resetPassword: (email: string) => void
    updateUserEmail: (newEmail: string) => void
    updateUserPassword: (newPassword: string) => void
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

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email: string) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateUserEmail(newEmail: string) {
        if (!auth.currentUser) {
            return
        }
        return updateEmail(auth.currentUser, newEmail)
    }

    function updateUserPassword(newPassword: string) {
        if (!auth.currentUser) {
            return
        }
        return updatePassword(auth.currentUser, newPassword)
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
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}