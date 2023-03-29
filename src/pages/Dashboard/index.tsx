import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HighlightCard } from '../../components/HighlightCard';

import { DataTransactionCardProps, TransactionCard } from '../../components/TransactionCard';

import { Container, Header, HighlightCards, Icon, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';

export interface DataListProps extends DataTransactionCardProps {
  id: string;
}

export function DashBoard(){
  const [data, setData] = useState<DataListProps[]>([]);

  const dataKey = '@gofinances:transactions';

  async function loadTransactions(){
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const dateFormatted = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item?.type,
        category: item.category,
        date: dateFormatted
      }
    });

    setData(transactionFormatted);
  }

  useEffect(() => {
    loadTransactions();
  },[])

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
          <GestureHandlerRootView>
            <LogoutButton onPress={() => {}}>
              <Icon name='power' />
            </LogoutButton>
          </GestureHandlerRootView>
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