'use client'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { onValue, ref, set } from 'firebase/database'
import { uid } from 'uid'
import { getAuth } from 'firebase/auth'

const MainSection = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const [tweetText, setTweetText] = useState('')
  const [tweets, setTweets] = useState([])

  const handleInputChange = (e: any) => {
    setTweetText(e.target.value)
  }
  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTweets([])
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map((tweet) => {
          setTweets((oldArray) => [...oldArray, tweet])
        })
      }
    })
  }, [])

  // write
  const writeToDatabase = (e: any) => {
    e.preventDefault()
    if (user) {
      const displayName = auth.currentUser.displayName
      const photoURL = auth.currentUser.photoURL
      const date = new Date()

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      let currentDate = `${day}-${month}-${year}`

      const uuid = uid()
      set(ref(db, `/${uuid}`), {
        tweetText,
        uuid,
        photoURL,
        displayName,
        currentDate,
      })
      setTweetText('')
    }
  }

  return (
    <div className='main-container d-inline-flex border border-secondary border-bottom-0 border-opacity-50 h-100'>
      <div className='main-section col mt-3 border border-secondary border-top-0 border-end-0 border-start-0 border-bottom-0 border-opacity-50 '>
        <form
          onSubmit={writeToDatabase}
          className='input-form pb-5 flex-column'
        >
          <div className='d-inline-flex flex-row align-items-center justify-content-evenly'>
            <img
              src={auth?.currentUser?.photoURL}
              className='input-avatar mt-1 ms-2'
            />
            <input
              type='text'
              value={tweetText}
              onChange={handleInputChange}
              required
              placeholder='Whats on your mind?'
              className='ms-4 border-0'
            />
          </div>

          <span className='d-flex align-items-end justify-content-end'>
            <button className='btn btn-primary me-5 mb-2'>Post</button>
          </span>
        </form>

        {tweets.map((tweet, id) => (
          <div className=' flex-column w-100 py-5 border border-start-0 border-end-0 border-secondary border-opacity-50 position-relative'>
            <div className='d-inline-flex flex-row align-items-center text-center justify-content-evenly '>
              <img className='avatar mt-1' src={tweet.photoURL} />
              <h5 className='mb-2'>{tweet.displayName}</h5>
              <p className='d-flex align-items-end justify-content-end position-absolute end-0 bottom-0 me-2'>
                {tweet.currentDate}
              </p>
            </div>
            <span className='d-flex flex-column align-items-start justify-content-between ms-5 px-4 '>
              <p className='px-2 ms-1'>{tweet.tweetText}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainSection
