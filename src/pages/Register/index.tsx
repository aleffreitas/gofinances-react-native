import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import { schema } from "../../components/Form/InputForm/validations";

interface FormDataProps {
  name: string;
  amount: number;
}

export function Register(){
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });
  const dataKey = '@gofinances:transactions';

  function handleTransactionsTypeSelect(type: 'income' | 'outcome'){
    setTransactionType(type);
  };

  function handleCloseModalSelectCategory(){
    setCategoryModalOpen(false);
  }

  function handleOpenModalSelectCategory(){
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormDataProps){

    if(!transactionType){
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category'){
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated)); 

    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível salvar')
    };
  }

  useEffect(() => {
    async function loadData(){
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    }

    loadData();
  },[])

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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
          
          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}