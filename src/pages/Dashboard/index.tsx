import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { DataTransactionCardProps, TransactionCard } from '../../components/TransactionCard';

import { Container, Header, HighlightCards, Icon, Photo, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';

export interface DataListProps extends DataTransactionCardProps {
  id: string;
}

export function DashBoard(){

  const data: DataListProps[] = [
      {
        id: '1',
        type: 'positive',
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.000,00',
        category: {
          name: 'Vendas',
          icon:'dollar-sign'
        },
        date: '13/04/2023'
      },
      {
        id: '2',
        type: 'negative',
        title: 'Hamburgueria Pizzy',
        amount: 'R$ 59,00',
        category: {
          name: 'Alimentação',
          icon:'coffee'
        },
        date: '13/04/2023'
      },
      {
        id: '3',
        type: 'negative',
        title: 'Aluguel do apartamento',
        amount: 'R$ 1.200,00',
        category: {
          name: 'Casa',
          icon:'shopping-bag'
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
        <TransactionList
          data={data}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />        
      </Transactions>
    </Container>
  );
}