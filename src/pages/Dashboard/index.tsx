import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HighlightCard } from '../../components/HighlightCard';

import { DataTransactionCardProps, TransactionCard } from '../../components/TransactionCard';

import { Container, Header, HighlightCards, Icon, LoadContainer, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserGreeting, UserInfo, UserName, UserWrapper } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import theme from '../../global/styles/theme';

export interface DataListProps extends DataTransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighLightDataProps {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function DashBoard(){
  const [data, setData] = useState<DataListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highLightData, setHighLightData] = useState<HighLightDataProps>({} as HighLightDataProps);

  const dataKey = '@gofinances:transactions';

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
    setHighLightData({
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        })
      },
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        })
      }
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
                <LogoutButton onPress={() => {}}>
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
              lastTransaction='Última entrada dia 13 de abril'
            />
            <HighlightCard
              title='Saídas'
              amount={highLightData?.expensive?.amount}
              type='up'
              lastTransaction='Última saída dia 03 de abril'
            />
            <HighlightCard
              title='Total'
              amount={highLightData?.total?.amount}
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
        </>
      }
    </Container>
  );
}