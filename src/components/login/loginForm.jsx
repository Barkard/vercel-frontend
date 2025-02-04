import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import RegisterForm from './registerForm';
import { CAlert } from '@coreui/react'; // Importamos CAlert de CoreUI

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showRecover, setShowRecover] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Authenticate any user
    if (username && password) {
      onLogin();
      navigate('/');
    } else {
      setError('Please enter both username and password');
    }
  };

  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const handleShowRecover = () => setShowRecover(true);
  const handleCloseRecover = () => setShowRecover(false);

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    if (email) {
      // Aquí iría la lógica para enviar la solicitud de recuperación de contraseña
      setSuccess(`Instructions to reset your password have been sent to ${email}`);
      setError('');
    } else {
      setError('Please enter your email');
      setSuccess('');
    }
  };

  const handleRetryRecover = () => {
    setEmail('');
    setError('');
    setSuccess('');
    setShowRecover(false); // Cerrar el modal de recuperación
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ width: '300px' }}>
        <h2 className="text-center mb-4 fw-bold">Sign In</h2>
        
        {/* Mostrar error si hay algún problema con la autenticación */}
        {error && <CAlert color="danger">{error}</CAlert>}

        <Form.Group className="mb-3" controlId="username">
          <Form.Label className="fw-bold">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </Form.Group>

        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        <Button variant="link" onClick={handleShowRegister} className="w-100 text-decoration-none">
          Register a new account
        </Button>

        <Button variant="link" onClick={handleShowRecover} className="w-100 text-decoration-none mt-3">
          Forgot your password?
        </Button>
      </Form>

      {/* Modal de Registro */}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm onClose={handleCloseRegister} />
        </Modal.Body>
      </Modal>

      {/* Modal de Recuperación de Contraseña */}
      <Modal show={showRecover} onHide={handleCloseRecover}>
        <Modal.Header closeButton>
          <Modal.Title>Recover Your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Mostrar el mensaje de éxito si se envió correctamente el correo */}
          {success && <CAlert color="success">{success}</CAlert>}

          {/* Mostrar error si no se ha ingresado el correo */}
          {error && <CAlert color="danger">{error}</CAlert>}

          <Form onSubmit={handleRecoverPassword}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
            </Form.Group>

            <Button type="submit" className="btn btn-primary w-100">Send Recovery Instructions</Button>
          </Form>
        </Modal.Body>

        {/* Botón para intentar otra vez */}
        {success && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleRetryRecover}>
              Try Again
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default LoginForm;