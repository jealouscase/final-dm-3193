'use client'
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { useRouter } from "next/navigation"

const AuthContext = createContext() 

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "final-project-b4720.firebaseapp.com",
    projectId: "final-project-b4720",
    storageBucket: "final-project-b4720.firebasestorage.app",
    messagingSenderId: "282760502365",
    appId: "1:282760502365:web:056301584e84c4a0f941b4"
};

export function AuthProvider({ children }) {
    const [appInitialized, setAppInitialized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [userInformation, setUserInformation] = useState(null)
    
    const router = useRouter()

    const createUserFunction = useCallback(
        (e) => {
            e.preventDefault()

            const email = e.currentTarget.email.value
            const password = e.currentTarget.password.value
            const auth = getAuth()

            createUserWithEmailAndPassword(auth, email,
                password)
                .then((userCredential) => {
                    const user = userCredential.user
                    setIsLoggedIn(true)
                    setUserInformation(user)
                    setError(null)
                    router.push('/profile')
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.warn({ error, errorCode, errorMessage })
                    setError(errorMessage)
                })
        },
        [setError, setIsLoggedIn, setUserInformation, router]
    )

    const loginUserFunction = useCallback(
        (e) => {
            e.preventDefault()
            const email = e.currentTarget.email.value
            const password = e.currentTarget.password.value

            const auth = getAuth()
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    setIsLoggedIn(true)
                    setUserInformation(user)
                    setError(null)
                    router.push('/profile')
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.warn({ error, errorCode, errorMessage })
                    setError(errorMessage)
                })
        },
        [setError, setIsLoggedIn, setUserInformation, router]
    )

    const logoutUserFunction = useCallback(() => {
        const auth = getAuth()

        signOut(auth)
            .then(() => {
                setUserInformation(null)
                setIsLoggedIn(false)
                router.push('/')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.warn({ error, errorCode, errorMessage })
                setError(errorMessage)
            })
    }, [setError, setIsLoggedIn, setUserInformation, signOut, router])

    useEffect(() => {
        const app = initializeApp(firebaseConfig)
        setAppInitialized(app)
    }, [])

    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserInformation(user)
                    setIsLoggedIn(false)
                } else {
                    setUserInformation(null)
                    setIsLoggedIn(false)
                }
                setIsLoading(false)
            })
        }
    }, [appInitialized])
    
    return (
        <AuthContext.Provider 
            value={{ 
                appInitialized,
                userInformation, 
                isLoading,
                isLoggedIn,
                loginUserFunction, 
                logoutUserFunction, 
                createUserFunction, }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
