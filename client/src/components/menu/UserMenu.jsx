import React from 'react';
import MenuItem from './MenuItem';
import { IoNotifications, IoHome } from 'react-icons/io5';
import { FaUsersCog } from 'react-icons/fa';
import { TbTransactionDollar } from 'react-icons/tb';

const UserMenu = () => {
  return (
    <div>
      <MenuItem address="/" icon={IoHome} label="Dashboard" />
      <MenuItem address="/overview" icon={FaUsersCog} label="Overview" />
      <MenuItem address="/transactions" icon={TbTransactionDollar} label="Transactions" />
      <MenuItem address="/notifications" icon={IoNotifications} label="Notifications" />
    </div>
  );
};

export default UserMenu;
