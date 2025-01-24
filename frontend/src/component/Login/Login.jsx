import React, { useState, useEffect } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(res => res.json())
      .then(data => console.log('Backend connected:', data))
      .catch(err => console.error('Backend connection failed:', err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      console.log('Sending login request with:', { email, password });

      const response = await fetch('http://127.0.0.1:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed. Please check your credentials.');
      }

      setSuccessMessage('Login successful!');
      setEmail('');
      setPassword('');
      
      setTimeout(() => {
        setShowLogin(false);
      }, 1500);

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      console.log('Sending registration request with:', { name, email, password });

      const response = await fetch('http://127.0.0.1:8000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed. Please check your input.');
      }

      setName('');
      setEmail('');
      setPassword('');
      
      setSuccessMessage('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        setCurrState('Login');
        setSuccessMessage('');
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login'>
      <form className="login-container" onSubmit={currState === 'Login' ? handleLogin : handleRegister}>
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross} alt="close" />
        </div>
        
        {successMessage && (
          <div className="success-message" style={{
            color: '#4caf50',
            backgroundColor: '#e8f5e9',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="error-message" style={{
            color: '#f44336',
            backgroundColor: '#ffebee',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            {error}
          </div>
        )}

        <div className="login-inputs">
          {currState === 'Sign Up' && (
            <input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading 
            ? 'Please wait...' 
            : (currState === 'Sign Up' ? 'Create account' : 'Login')}
        </button>
        
        <div className="login-condition">
          <input type="checkbox" required disabled={isLoading} />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        
        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span 
              onClick={() => !isLoading && setCurrState('Sign Up')}
              style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span 
              onClick={() => !isLoading && setCurrState('Login')}
              style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;