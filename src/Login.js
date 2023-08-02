import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin =async () => {
    if (username === 'seda' || username === 'berna' || username === 'bilgin') {
        const user = await Auth.signIn(username, password);
    if(user){
        onLogin(true);
        setError('');
    }else{
        setError('Invalid username or password');  
    }

    } else {
      setError('Not admin user');
    }

  
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
