import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";

export function Register(){
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelect(type: 'income' | 'outcome'){
    setTransactionType(type);
  };

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome"/>
          <Input placeholder="Preço"/>

          <TransactionsType>
            <TransactionTypeButton
              title="Income"
              type="income"
              isActive={transactionType === 'income'}
              onPress={() => handleTransactionsTypeSelect('income')}
            />
            <TransactionTypeButton
              title="Outcome"
              type="outcome"
              isActive={transactionType === 'outcome'}
              onPress={() => handleTransactionsTypeSelect('outcome')}
            />
          </TransactionsType>

          <CategorySelect title="Categoria"/>
        </Fields>
        
        <Button title="Enviar"/>
      </Form>
    </Container>
  );
}