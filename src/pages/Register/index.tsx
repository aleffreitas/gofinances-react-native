import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsType } from "./styles";
import { schema } from "../../components/Form/InputForm/validations";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesParamList } from "../../routes/app.routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../hooks/auth";

interface FormDataProps {
  name: string;
  amount: number;
}

type RegisterNavigationProps = BottomTabNavigationProp<AppRoutesParamList>;

export function Register(){
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { user } = useAuth();
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const dataKey = `@gofinances:transactions_user:${user.id}`;
  const navigation = useNavigation<RegisterNavigationProps>();

  function handleTransactionsTypeSelect(type: 'income' | 'outcome'){
    setTransactionType(type);
  };

  function handleCloseModalSelectCategory(){
    setCategoryModalOpen(false);
  }

  function handleOpenModalSelectCategory(){
    setCategoryModalOpen(true);
  }

  function resetInsertData(){
    reset();
    setTransactionType('');
    setCategory({
      key: 'category',
      name: 'Categoria'
    })
  }

  async function handleRegister(form: FormDataProps){

    if(!transactionType){
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category'){
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated)); 

      resetInsertData();

      navigation.navigate("Listagem");

    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possível salvar')
    };
  }

  useEffect(() => {
    async function loadData(){
      const data = await AsyncStorage.getItem(dataKey);
      // console.log(JSON.parse(data!));
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
              testID="button-category"
              title={category.name}
              onPress={handleOpenModalSelectCategory}
            />
          </Fields>
          
          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal testID='modal-category' visible={categoryModalOpen}>
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