import React from "react";
import { Amount, Category, CategoryName, Container, Date, Footer, Icon, Title } from "./styles";

type CategoryProps = {
  name: string;
  icon: string;
}

type DataProps = {
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

type TransactionCardProps = {
  data: DataProps;
}

export function TransactionCard({ data }: TransactionCardProps){
  return(
    <Container>
      <Title>{data?.title}</Title>
      <Amount>{data?.amount}</Amount>

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