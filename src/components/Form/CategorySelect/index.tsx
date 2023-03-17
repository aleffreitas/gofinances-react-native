import React from "react";
import { Button, Category, Icon } from "./styles";

interface CategorySelectProps {
  title: string;
}

export function CategorySelect({ title }: CategorySelectProps){
  return(
    <Button>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Button>
  );
}