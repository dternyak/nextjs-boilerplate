import React from 'react';
import { withRouter } from 'next/router';
import { Menu } from 'antd';
import Link from 'next/link';


const MenuLink = ({ href, name }: any) => {
  return (
      <Menu.Item key={href}>
        <Link href={href}>

        <a>{name}</a>
        </Link>
      </Menu.Item>

  );
};

export default MenuLink;
