import React from 'react';
import Link, { LinkState } from 'next/link';
import styled from 'styled-components';

const MyButton = styled.button``;

const MyLink = styled.a`
  color: white;

  &:focus {
    color: black !important;
  }

  ${MyButton}:hover & {
    color: black;
  }
`;

interface ButtonLinkProps {
  href: LinkState['href'];
  name: string;
}

const ButtonLink = ({ name, href }: ButtonLinkProps) => {
  return (
    <Link prefetch href={href}>
      <MyButton className="ui inverted button">
        <MyLink>{name}</MyLink>
      </MyButton>
    </Link>
  );
};

export default ButtonLink;
