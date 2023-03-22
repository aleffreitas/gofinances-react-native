import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { GestureHandlerRootView, RectButton } from "react-native-gesture-handler";

type IconProps = {
  type: 'income' | 'outcome';
};

type ContainerProps = {
  type: 'income' | 'outcome';
  isActive: boolean;
};

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
`;

export const Content = styled.View<ContainerProps>`
  ${({ theme, isActive }) => css`
  border: ${isActive ? 'none' : `1.5px solid ${theme.colors.text}`};
  `}
  ${({ theme, isActive, type }) => isActive && type === 'income' && css`
  background-color: ${theme.colors.successLight};
  `}
  ${({ theme, isActive, type }) => isActive && type === 'outcome' && css`
  background-color: ${theme.colors.attentionLight};
  `}
  width: 98%;
  border-radius: 5px;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 100%;
`;

export const Icon = styled(Feather)<IconProps>`
  ${({ theme, type }) => css`
    color: ${type === 'income' ? theme.colors.success : theme.colors.attention};  
  `}
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
  `}
  font-size: ${RFValue(14)}px;
`;