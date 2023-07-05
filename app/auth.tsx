'use client'

import { useEffect, useState } from 'react'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { app, googleAuthProvider } from './firebase'

const AuthProvider = (app) => {
  const auth = getAuth()

  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    const GlobalUser = localStorage.getItem('user')
    console.log(JSON.parse(GlobalUser))
  }, [user])

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser != null) {
        return setUser(maybeUser)
      }

      signInWithPopup(auth, googleAuthProvider)
        .then((credentials) => setUser(credentials.user))
        .catch((e) => console.error(e))
    })
    return unsub
  }, [auth])

  return user != null ? (
    <>
      <img src={user.photoURL} alt='' />
    </>
  ) : (
    <>loading</>
  )
}

export default AuthProvider
