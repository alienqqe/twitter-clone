import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const API_KEY = process.env.API_KEY

export const firebaseConfig = {
  apiKey: API_KEY,

  authDomain: 'twitterclone-bda29.firebaseapp.com',

  projectId: 'twitterclone-bda29',

  storageBucket: 'twitterclone-bda29.appspot.com',

  messagingSenderId: '610509014308',

  appId: '1:610509014308:web:6393ad46039f6221591fb1',

  measurementId: 'G-24W9M6DKQP',

  databaseURL:
    'https://twitterclone-bda29-default-rtdb.europe-west1.firebasedatabase.app/',
}

export const app = initializeApp(firebaseConfig)
export const googleAuthProvider = new GoogleAuthProvider()

export const db = getDatabase(app)
