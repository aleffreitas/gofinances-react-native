import React from 'react';
import {  GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';
import { Button, Container, Content, Icon, Title} from './styles';

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: 'income' | 'outcome';
  isActive: boolean;
}

const icons = {
  income: 'arrow-down-circle',
  outcome: 'arrow-up-circle'
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: TransactionTypeButtonProps){
  return(
    <Container>
      <Content type={type} isActive={isActive}>
        <Button {...rest}>
          <Icon name={icons[type]} type={type}/>
          <Title>{title}</Title>
        </Button>
      </Content>
    </Container>
  );
}