'use client'
import { getAuth, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase'
import { useRouter } from 'next/navigation'
import AuthProvider from '../auth'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  initializeApp(firebaseConfig)
  let [logIn, setLogIn] = useState(false)
  const router = useRouter()
  const auth = getAuth()

  const handleLogOut = () => {
    if (confirm('Do you want to log out?')) {
      signOut(auth)
        .then(() => {
          alert('Sigh out succesful')
          router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const handleSignIn = () => {
    setLogIn(true)
  }

  return (
    <>
      <div className='profile-container text-center'>
        {auth?.currentUser ? (
          <>
            <img
              className='profile-photo py-4'
              src={auth?.currentUser?.photoURL}
            />
            <h4 className='py-4'>{auth?.currentUser?.displayName}</h4>
            <button
              onClick={handleLogOut}
              className='btn btn-light btn-light-outline'
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <h1>You isn't signed in</h1>
            <button
              onClick={handleSignIn}
              className='btn btn-light btn-light outline'
            >
              Sign In
            </button>
            {logIn ? <AuthProvider /> : ''}
          </>
        )}
      </div>
    </>
  )
}

export default ProfilePage
