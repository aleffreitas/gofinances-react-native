import React from "react";
import { Amount, Category, CategoryName, Container, Date, Footer, Icon, Title } from "./styles";

type CategoryProps = {
  name: string;
  icon: string;
}

export type DataTransactionCardProps = {
  type: 'positive' | 'negative'
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

type TransactionCardProps = {
  data: DataTransactionCardProps;
}

export function TransactionCard({ data }: TransactionCardProps){
  return(
    <Container>
      <Title>{data?.title}</Title>
      <Amount type={data?.type}>
        {data?.type === 'negative' && '- '}
        {data?.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data?.category?.icon} />
          <CategoryName>{data?.category?.name}</CategoryName>
        </Category>
        <Date>{data?.date}</Date>
      </Footer>
    </Container>
  );
}