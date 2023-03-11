import React from 'react';

import { Container, Header, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';

export function DashBoard(){
  return(
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/59258709?v=4'}}/>
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Alef</UserName>
            </User>
          </UserInfo>
          <Icon name='power' />
        </UserWrapper>
      </Header>
    </Container>
  );
}