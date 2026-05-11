import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecuperarContrasenyaPage from './pages/RecuperarContrasenyaPage';
import TransportsAvuiPage from './pages/TransportsAvuiPage';
import AssignacionsPage from './pages/AssignacionsPage';
import DesassignacionsPage from './pages/DesassignacionsPage';
import TransportsPage from './pages/TransportsPage';
import DesbloqueigPage from './pages/DesbloqueigPage';
import UsuariPage from './pages/UsuariPage';
import { InternalLayout } from './components/InternalLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/recuperar-contrasenya',
    element: <RecuperarContrasenyaPage />,
  },
  {
    element: <InternalLayout />,
    children: [
      {
        path: '/transports-avui',
        element: <TransportsAvuiPage />,
        handle: { title: 'Transports avui' },
      },
      {
        path: '/assignacions',
        element: <AssignacionsPage />,
        handle: { title: 'Gestionar assignacions' },
      },
      {
        path: '/desassignacions',
        element: <DesassignacionsPage />,
        handle: { title: 'Gestionar assignacions' },
      },
      {
        path: '/transports',
        element: <TransportsPage />,
        handle: { title: 'Transports' },
      },
      {
        path: '/desbloqueig',
        element: <DesbloqueigPage />,
        handle: { title: 'Desbloqueig Usuaris' },
      },
      {
        path: '/usuari',
        element: <UsuariPage />,
        handle: { title: 'Usuari' },
      },
    ],
  },
  {
    path: '*',
    element: <HomePage />,
  },
]);
