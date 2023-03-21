import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import { Container } from "./styles";

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({ name, control, ...rest }: InputFormProps){
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
    </Container>
  );
}