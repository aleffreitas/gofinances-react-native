import React from "react";
import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";
import { Button, Category, Icon } from "./styles";

interface CategorySelectProps extends RectButtonProps{
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, testID, onPress }: CategorySelectProps){
  return(
    <GestureHandlerRootView>
      <Button onPress={onPress} testID={testID}>
        <Category>{title}</Category>
        <Icon name='chevron-down' />
      </Button>
    </GestureHandlerRootView>
  );
}