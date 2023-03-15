import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ActionButton, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps){
  return(
    <ActionButton  {...rest}>
      <Title>{title}</Title>
    </ActionButton>
  );
}