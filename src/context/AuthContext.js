import React, { useContext, useState, useEffect } from 'react'
import { auth } from './../firebase';
import { firebase } from 'firebase/app';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)



    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut();
    }
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    function updatePassword(password) {
        return currentUser.updatePassword(password)

    }


    function restPassword(email) {
        auth.sendPasswordResetEmail(email)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout,
        restPassword,
        updateEmail,
        updatePassword
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


// export { useAuth, AuthProvider }