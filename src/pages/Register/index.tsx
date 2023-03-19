import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category'
  });

  function handleTransactionsTypeSelect(type: 'income' | 'outcome'){
    setTransactionType(type);
  };

  function handleCloseModalSelectCategory(){
    setCategoryModalOpen(false);
  }

  function handleOpenModalSelectCategory(){
    setCategoryModalOpen(true);
  }

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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenModalSelectCategory}
          />
        </Fields>
        
        <Button title="Enviar"/>
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseModalSelectCategory}
        />
      </Modal>
    </Container>
  );
}