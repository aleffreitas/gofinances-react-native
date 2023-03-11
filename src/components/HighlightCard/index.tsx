import React from "react";
import { Amount, Container, Footer, Header, Icon, LastTransaction, Title } from "./styles";

export function HighlightCard(){
  return(
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name='arrow-down-circle' />
      </Header>
      <Footer>
        <Amount>R$ 17.400,00</Amount>
        <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
      </Footer>
    </Container>
  );
}