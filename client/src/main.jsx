import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './pages/menu/Menu.jsx';
import Adress from './pages/adres/Adress.jsx';
import Reservation from './pages/reservation/Reservation.jsx';
import ColdRolls from './pages/allFood/coldRolls/ColdRolls.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/adress',
    element: <Adress />,
  },
  {
    path: '/reservarion',
    element: <Reservation />,
  },
  {
    path: '/menu/coldrolls',
    element: <ColdRolls />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
