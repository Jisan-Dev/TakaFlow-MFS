import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Login } from '@/components/auth/Login';
import { SignUp } from '@/components/auth/SignUp';
import Overview from '@/pages/common/Overview';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [{ path: '/', element: <Overview /> }],
  },
  { path: '/login', element: <Login /> },
  { path: '/sign-up', element: <SignUp /> },
]);

export default router;
