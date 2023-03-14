import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.shape};
  `}
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
  `}
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
  `}
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  ${({ theme }) => css`
    color: ${theme.colors.text};
  `}
  font-size: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
  `}
  font-size: ${RFValue(14)}px;
  margin-left: 17px;
`;

export const Date = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.regular};
  `}
  font-size: ${RFValue(14)}px;
`;

