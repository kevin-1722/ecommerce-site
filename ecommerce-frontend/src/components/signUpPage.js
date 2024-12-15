import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../components/appContext'
//import './signUpPage.css'

const SignUpPage = () => {
  const navigate = useNavigate()
  const { handleSignUp, authError } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Attempt to register user
    const registrationSuccess = await handleSignUp(username, password);
    
    if (registrationSuccess) {
      navigate('/');
    } else {
      // If registration fails, authError will be set in context
      setError(authError || 'Registration failed');
    }
  }

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
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
        <input 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password" 
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleGoHome} className="home-button">
        Cancel
      </button>
    </div>
  )
}

export default SignUpPage