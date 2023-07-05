import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'

const API_KEY = process.env.API_KEY

const firebaseConfig = {
  apiKey: API_KEY,

  authDomain: 'twitterclone-bda29.firebaseapp.com',

  projectId: 'twitterclone-bda29',

  storageBucket: 'twitterclone-bda29.appspot.com',

  messagingSenderId: '610509014308',

  appId: '1:610509014308:web:6393ad46039f6221591fb1',

  measurementId: 'G-24W9M6DKQP',
}

export const app = initializeApp(firebaseConfig)
export const googleAuthProvider = new GoogleAuthProvider()
