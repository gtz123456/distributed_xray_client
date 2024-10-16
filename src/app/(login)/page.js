'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Controls whether it's login or register mode

  const router = useRouter();

  const server = 'http://localhost:8080';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  function handleLogin() {
    // Send a POST request to the server, and get the jwt token in the response body
    let loginURL = `${server}/login`;
    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "Email": email, "Password": password }),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        
        if (token) {
          console.log('JWT Token:', token);

          localStorage.setItem('token', token);

          // Redirect to the main page
          router.push('/main');
        } else {
          console.error('No token found in response');
        }
      })
      .catch((err) => {
        console.error('Error during login:', err);
      });
  }

  function handleRegister() {
    let registerURL = `${server}/register`;
    fetch(registerURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Register:', data);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a
            href="#"
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {isLogin ? 'Register' : 'Login'}
          </a>
        </p>
      </div>
    </div>
  );
}