import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


// Componentes
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
import LoginForm from './components/login/loginForm';

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true); // Cambia el estado de autenticado a verdadero
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (!isColorModeSet()) {
      setColorMode(storedTheme);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense fallback={<div className="pt-3 text-center"><CSpinner color="primary" variant="grow" /></div>}>
        <Routes>
          {!isAuthenticated ? (
            // Si no está autenticado, muestra la página de login
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          ) : (
            // Si está autenticado, muestra el layout principal
            <Route path="*" element={<DefaultLayout />} />
          )}
          <Route path="/register" name="Register Page" element={<Register />} />
          <Route path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
  
};

export default App;
