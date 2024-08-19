import React from 'react';
import MenuItem from './MenuItem';
import { SiHdfcbank } from 'react-icons/si';

const UserMenu = () => {
  return (
    <div>
      <MenuItem address="/as" icon={SiHdfcbank} label="User" />
    </div>
  );
};

export default UserMenu;
