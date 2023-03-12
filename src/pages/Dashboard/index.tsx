import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import { Container, Header, HighlightCards, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';

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

      <HighlightCards>
        <HighlightCard
          title='Entradas'
          amount='R$ 17.400,00'
          type='down'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          title='Saídas'
          amount='R$ 1.259,00'
          type='up'
          lastTransaction='Última entrada dia 03 de abril'
        />
        <HighlightCard
        title='Total'
        amount='R$ 16.141,00'
        type='total'
        lastTransaction='01 à 16 de abril'
      />
      </HighlightCards>
    </Container>
  );
}