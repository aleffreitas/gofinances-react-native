import React from "react";
import { categories } from "../../utils/categories";
import { Amount, Category, CategoryName, Container, Date, Footer, Icon, Title } from "./styles";

// type CategoryProps = {
//   name: string;
//   icon: string;
// }

export type DataTransactionCardProps = {
  type: 'income' | 'outcome'
  name: string;
  amount: string;
  category: string;
  date: string;
}

type TransactionCardProps = {
  data: DataTransactionCardProps;
}

export function TransactionCard({ data }: TransactionCardProps){
  const [ category ] = categories.filter(
    item => item.key === data.category
  );

  return(
    <Container>
      <Title>{data?.name}</Title>
      <Amount type={data?.type}>
        {data?.type === 'outcome' && '- '}
        {data?.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{data?.date}</Date>
      </Footer>
    </Container>
  );
}