import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HighlightCard } from '../../components/HighlightCard';

import { DataTransactionCardProps, TransactionCard } from '../../components/TransactionCard';

import { Container, Header, HighlightCards, Icon, LoadContainer, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends DataTransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightDataProps {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

type GetLastTransactionDateProps = {
  collection: DataListProps[];
  type: 'income' | 'outcome';
}

export function DashBoard(){
  const [data, setData] = useState<DataListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highLightData, setHighLightData] = useState<HighLightDataProps>({} as HighLightDataProps);
  const { signOut } = useAuth();

  const dataKey = '@gofinances:transactions';

  function getLastTransactionDate({ collection, type }: GetLastTransactionDateProps){
    const lastTransaction = new Date(
      Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime()))
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`;
  }

  async function loadTransactions(){
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {

      if(item.type === 'income'){
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

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

    const total = entriesTotal - expensiveTotal;

    setData(transactionFormatted);

    const lastTransactionEntries = getLastTransactionDate({ collection: transactions, type: 'income' });
    const lastTransactionExpensive = getLastTransactionDate({ collection: transactions, type: 'outcome' });
    const totalInterval = `01 à ${lastTransactionExpensive}`;

    setHighLightData({
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensive}`, 
      },
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      },
    })

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  },[]);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[])
  );

  return(
    <Container>
      {isLoading ? 
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size='large'
          /> 
        </LoadContainer>
      : 
        <>
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
                <LogoutButton onPress={signOut}>
                  <Icon name='power' />
                </LogoutButton>
              </GestureHandlerRootView>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title='Entradas'
              amount={highLightData?.entries?.amount}
              type='down'
              lastTransaction={highLightData.entries.lastTransaction}
            />
            <HighlightCard
              title='Saídas'
              amount={highLightData?.expensive?.amount}
              type='up'
              lastTransaction={highLightData.expensive.lastTransaction}
            />
            <HighlightCard
              title='Total'
              amount={highLightData?.total?.amount}
              type='total'
              lastTransaction={highLightData.total.lastTransaction}
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
        </>
      }
    </Container>
  );
}