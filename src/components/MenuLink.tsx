import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';

interface MenuLinkProps {
  href: string;
  name: string;
}

const MenuLink = ({ href, name }: MenuLinkProps) => {
  return (
    <Menu.Item key={href}>
      <Link href={href}>
        <a>{name}</a>
      </Link>
    </Menu.Item>
  );
};

export default MenuLink;
