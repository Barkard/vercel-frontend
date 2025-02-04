import React, { useState } from 'react';

const RegisterForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Register logic here
    console.log('New user registered:', { username, email, password });
    alert('Registration successful!');
    onClose(); // Close the modal after registration
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="registerUsername" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="registerUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="registerEmail" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="registerEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="registerPassword" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="registerPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary w-100">Register</button>
    </form>
  );
};

export default RegisterForm;
