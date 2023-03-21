import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import { Container, Error } from "./styles";

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({ name, control, error, ...rest }: InputFormProps){
  return(
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: {value, onChange}}) => (
          <Input 
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      {error && <Error>{error}</Error>}      
    </Container>
  );
}