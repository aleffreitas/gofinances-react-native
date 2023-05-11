import React, { useEffect, useState } from 'react';
import { Container, Content, Header, Title } from './styles';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';

interface TransactionData {
  type: 'income' | 'outcome'
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume(){
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const dataKey = '@gofinances:transactions';


  async function loadData(){
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'outcome');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0){
        const total = categorySum.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData()
  },[])

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      
      <Content>
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}