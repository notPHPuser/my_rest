import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './pages/menu/Menu.jsx';
import Adress from './pages/adres/Adress.jsx';
import Reservation from './pages/reservation/Reservation.jsx';
import ColdRolls from './pages/allFood/coldRolls/ColdRolls.jsx';
import HotRolls from './pages/allFood/hotRolls/HolRolls.jsx';
import Drinks from './pages/allFood/drinks/Drinks.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import AdminPanel from './pages/admin-panel/AdminPanel.jsx';

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
  {
    path: '/menu/hotrolls',
    element: <HotRolls />,
  },
  {
    path: '/menu/drinks',
    element: <Drinks />,
  },
  {
    path: '/adminpanel',
    element: <AdminPanel />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
