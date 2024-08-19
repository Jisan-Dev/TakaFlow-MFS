import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Login } from '@/components/auth/Login';
import { SignUp } from '@/components/auth/SignUp';
import Home from '@/pages/home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  { path: '/login', element: <Login /> },
  { path: '/sign-up', element: <SignUp /> },
]);

export default router;
