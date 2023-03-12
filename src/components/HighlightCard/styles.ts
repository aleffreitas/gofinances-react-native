import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: 'up' | 'down' | 'total';
}

interface ContainerProps extends IconProps {};

interface TitleProps extends IconProps {};

interface AmountProps extends IconProps {};

interface LastTransactionProps extends IconProps {};

export const Container = styled.View<ContainerProps>`
  ${({ theme, type }) => css`
    background-color: ${type === 'total' ? theme.colors.secondary : theme.colors.shape};
  `}

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TitleProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  `}
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<IconProps>`
  ${({ theme, type }) => css`
    color: ${type === 'down' ? `${theme.colors.success}` : type === 'up' ? `${theme.colors.attention}` : `${theme.colors.shape}`};
  `}
  font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View`

`;

export const Amount = styled.Text<AmountProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.medium};
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text_dark};
  `}
    font-size: ${RFValue(32)}px;
    margin-top: 38px;
`;

export const LastTransaction = styled.Text<LastTransactionProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    color: ${type === 'total' ? theme.colors.shape : theme.colors.text};
  `}
    font-size: ${RFValue(12)}px;
`;