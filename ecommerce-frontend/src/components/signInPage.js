import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../components/appContext'
import './signInPage.css'

const SignInPage = () => {
  const navigate = useNavigate()
  const { handleSignIn, authError } = useAppContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const signInSuccess = await handleSignIn(username, password)
    if (signInSuccess) {
      navigate('/')
    }
    // If signInSuccess is false, it will stay on the sign-in page due to no navigation
  }

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  }

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      {authError && <p className="error">{authError}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" 
          required 
        />
        <button type="submit">Sign In</button>
        <button onClick={handleGoHome} className="home-button">
          Back Home
        </button>
        <p>Don't have an account?</p>
        <button onClick={handleSignUp} className="sign-up-button">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignInPage