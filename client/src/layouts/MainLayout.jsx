import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen md:flex font-kanit">
      <Sidebar />
      <div className="flex-1  p-5 bg-indigo-900 ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
