import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Login } from '@/components/auth/Login';
import { SignUp } from '@/components/auth/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
  },
]);

export default router;
