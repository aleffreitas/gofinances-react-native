import React from "react";
import { TextInputProps } from "react-native";
import { InputData } from "./styles";

interface InputProps extends TextInputProps{
  active?: boolean;
};

export function Input({active, ...rest}: InputProps){
  return(
    <InputData active={active} {...rest}/>
  );
}