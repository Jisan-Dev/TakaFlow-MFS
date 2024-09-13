import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform hover:bg-indigo-500 hover:text-white rounded-md ${
          isActive ? 'bg-indigo-600 text-white' : 'text-white'
        }`
      }>
      <Icon className="w-5 h-5" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};
