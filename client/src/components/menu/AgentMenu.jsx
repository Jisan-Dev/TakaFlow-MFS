import React from 'react';
import MenuItem from './MenuItem';
import { SiHdfcbank } from 'react-icons/si';

const AgentMenu = () => {
  return (
    <div>
      <MenuItem address="/asty" icon={SiHdfcbank} label="Agent" />
    </div>
  );
};

export default AgentMenu;
