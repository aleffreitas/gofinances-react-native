import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import { Container, Header, HighlightCards, Icon, Photo, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';

export function DashBoard(){

  const data = [
      {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.000,00',
        category: {
          name: 'Vendas',
          icon:'dollar-sign'
        },
        date: '13/04/2023'
      },
      {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.000,00',
        category: {
          name: 'Vendas',
          icon:'dollar-sign'
        },
        date: '13/04/2023'
      },
      {
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.000,00',
        category: {
          name: 'Vendas',
          icon:'dollar-sign'
        },
        date: '13/04/2023'
      }
  ];

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

      <Transactions>
        <Title>Listagem</Title>
        < TransactionList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
        />        
      </Transactions>
    </Container>
  );
}