import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
