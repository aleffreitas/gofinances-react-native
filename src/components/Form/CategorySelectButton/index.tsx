import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, Category, Icon } from "./styles";

interface CategorySelectProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectProps){
  return(
    <GestureHandlerRootView>
      <Button onPress={onPress}>
        <Category>{title}</Category>
        <Icon name='chevron-down' />
      </Button>
    </GestureHandlerRootView>
  );
}