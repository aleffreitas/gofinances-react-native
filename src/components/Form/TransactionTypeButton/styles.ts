import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type IconProps = {
  type: 'income' | 'outcome';
};

type ButtonProps = {
  type: 'income' | 'outcome';
  isActive: boolean;
};

export const Button = styled(TouchableOpacity)<ButtonProps>`
  ${({ theme, isActive }) => css`
    border: ${isActive ? 'none' : `1.5px solid ${theme.colors.text}`};
  `}
  ${({ theme, isActive, type }) => isActive && type === 'income' && css`
    background-color: ${theme.colors.successLight};
  `}
  ${({ theme, isActive, type }) => isActive && type === 'outcome' && css`
    background-color: ${theme.colors.attentionLight};
  `}
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 16px;
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