import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 50px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;

const CopyRight = styled.span`
  margin-left: 30px;
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => {
  return (
    <Footer>
      <List>
        <ListItem>
          <Link href="#">about us</Link>
        </ListItem>
        <ListItem>
          <Link href="#">support</Link>
        </ListItem>
        <ListItem>
          <Link href="#">press</Link>
        </ListItem>
        <ListItem>
          <Link href="#">api</Link>
        </ListItem>
        <ListItem>
          <Link href="#">jobs</Link>
        </ListItem>
        <ListItem>
          <Link href="#">privacy</Link>
        </ListItem>
        <ListItem>
          <Link href="#">terms</Link>
        </ListItem>
        <ListItem>
          <Link href="#">driectory</Link>
        </ListItem>
        <ListItem>
          <Link href="#">profiles</Link>
        </ListItem>
        <ListItem>
          <Link href="#">hashtags</Link>
        </ListItem>
        <ListItem>
          <Link href="#">language</Link>
        </ListItem>
      </List>

      <CopyRight>Prismagram {new Date().getFullYear()} &copy;</CopyRight>
    </Footer>
  );
};
