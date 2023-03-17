import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button, Icon, Title} from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
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
    <Button {...rest } type={type} isActive={isActive}>
      <Icon name={icons[type]} type={type}/>
      <Title>{title}</Title>
    </Button>
  );
}