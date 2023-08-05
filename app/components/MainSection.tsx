'use client'
import { useEffect, useRef, useState } from 'react'
import { db } from '../firebase'
import { onValue, ref, set, remove } from 'firebase/database'
import { uid } from 'uid'
import { getAuth } from 'firebase/auth'
import Sidebar from './Sidebar'

const MainSection = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const [tweetText, setTweetText] = useState('')
  const [tweets, setTweets] = useState([])
  const inputRef = useRef(null)

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
  // delete
  const handleDelete = (tweet) => {
    remove(ref(db, `/${tweet.uuid}`))
  }

  return (
    <>
      <Sidebar inputRef={inputRef} />
      <div className='main-container d-inline-flex border border-secondary border-bottom-0 border-opacity-50 h-100'>
        <div className='main-section col mt-3 border border-secondary border-top-0 border-end-0 border-start-0 border-bottom-0 border-opacity-50 '>
          <form
            onSubmit={writeToDatabase}
            className='input-form pb-5 flex-column'
          >
            <div className='d-inline-flex flex-row align-items-center justify-content-evenly'>
              <img
                src={auth.currentUser?.photoURL}
                className='input-avatar mt-1 ms-2'
              />
              <input
                ref={inputRef}
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
                <p className='d-flex align-items-end justify-content-end position-absolute end-0 top-0 me-2 mt-4'>
                  {tweet.currentDate}
                </p>
                <button
                  className='d-flex align-items-end justify-content-end btn btn-outline-light position-absolute end-0 bottom-0 mb-4 me-2'
                  onClick={() => handleDelete(tweet)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-trash3-fill'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z' />
                  </svg>
                </button>
              </div>
              <span className='d-flex flex-column align-items-start justify-content-between ms-5 px-4 '>
                <p className='px-2 ms-1'>{tweet.tweetText}</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MainSection
