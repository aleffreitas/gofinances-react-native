import React from "react";
import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";
import { ActionButton, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: ButtonProps){
  return(
    <GestureHandlerRootView>
      <ActionButton onPress={onPress} {...rest}>
        <Title>{title}</Title>
      </ActionButton>
    </GestureHandlerRootView>
  );
}