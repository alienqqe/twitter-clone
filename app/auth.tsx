'use client'

import { useEffect, useState } from 'react'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { app, googleAuthProvider } from './firebase'
import { useRouter } from 'next/navigation'

const AuthProvider = (app) => {
  const auth = getAuth()
  const router = useRouter()
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    const GlobalUser: Object = localStorage.getItem('user')
  }, [user])

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser != null) {
        router.push('/')
        return setUser(maybeUser)
      }

      signInWithPopup(auth, googleAuthProvider)
        .then((credentials) => setUser(credentials.user))
        .catch((e) => console.error(e))
    })
    return unsub
  }, [auth])

  return user != null ? <></> : <></>
}

export default AuthProvider
