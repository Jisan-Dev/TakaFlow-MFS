import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { GiCash } from 'react-icons/gi';
import MenuItem from './menu/MenuItem';
import { SiHdfcbank } from 'react-icons/si';
import { AuthContext } from '@/providers/AuthProvider';
import UserMenu from './menu/UserMenu';
import AgentMenu from './menu/AgentMenu';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  // const [toggle, setToggle] = useState(true);
  // const { booleanState, toggleBooleanState } = useBoolean();
  // const [role] = useRole();
  // console.log(role);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  // const toggleHandler = () => {
  //   toggleBooleanState();
  // };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-indigo-100/20 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to={'/'} className="text-2xl font-semibold font-ibmsans flex items-center gap-1 text-indigo-600">
              <GiCash className="text-4xl" /> TakaFlows
            </Link>
          </div>
        </div>

        <button onClick={handleToggle} className="mobile-menu-button p-4 focus:outline-none ">
          <AiOutlineBars className="h-5 w-5 text-indigo-800" />
        </button>
      </div>

      {/* Sidebar */}
      <div className="bg-indigo-900 w-64">
        <div
          className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-white/20 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            !isActive && '-translate-x-full'
          }  md:translate-x-0 backdrop-blur-3xl rounded-3xl transition duration-200 ease-in-out`}>
          <div>
            <div>
              <div className="w-full hidden md:flex mt-6 rounded-lg justify-center items-center mx-auto">
                <Link to={'/'} className="text-3xl font-semibold font-ibmsans flex items-center gap-1 text-indigo-100">
                  <GiCash className="text-4xl" /> TakaFlow
                </Link>
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col justify-between flex-1 mt-6">
              {/*  Menu Items */}
              <nav>
                <MenuItem address={'/'} icon={SiHdfcbank} label={'OverviewCom'} />
                {user?.role === 'personal' && <UserMenu />}
                {user?.role === 'agent' && <AgentMenu />}

                {/* Add Room */}
                {/* {role === 'guest' && <GuestMenu />}
                {role === 'host' ? booleanState ? <HostMenu /> : <GuestMenu /> : undefined}
                {role === 'admin' && <AdminMenu />} */}
              </nav>
            </div>
          </div>

          <div>
            <hr />

            {/* Profile Menu */}
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                }`
              }>
              {/* <FcSettings className="w-5 h-5" /> */}

              <span className="mx-4 font-medium">Profile</span>
            </NavLink>
            <button
              // onClick={logOut}
              className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform">
              {/* <GrLogout className="w-5 h-5" /> */}

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
