import React, { useEffect, useState } from 'react';
import { ChartContainer, Container, Content, Header, Month, MonthSelect, MonthSelectButton, MonthSelectIcon, Title } from './styles';
import { HistoryCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume(){
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const theme = useTheme();
  const dataKey = '@gofinances:transactions';

  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }


  async function loadData(){
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'outcome' && 
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives
    .reduce((accumulator: number, expensive: TransactionData) =>{
      return accumulator + Number(expensive.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0){
        const totalFormatted = categorySum.toLocaleString('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData()
  },[selectedDate])

  return(
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >

        <MonthSelect>
          <GestureHandlerRootView>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name='chevron-left' />
            </MonthSelectButton>
          </GestureHandlerRootView>

          <Month>
            {format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
          </Month>

          <GestureHandlerRootView>
            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name='chevron-right' />
            </MonthSelectButton>
          </GestureHandlerRootView>

        </MonthSelect>


        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            x='percent'
            y='total'
            labelRadius={70}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
          />
        </ChartContainer>

        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}