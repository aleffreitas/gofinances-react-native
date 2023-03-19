import React from "react";
import { Button, Category, Icon } from "./styles";

interface CategorySelectProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectProps){
  return(
    <Button onPress={onPress}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Button>
  );
}