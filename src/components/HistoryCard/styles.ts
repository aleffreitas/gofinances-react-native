import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, color }) => css`
    background-color: ${theme.colors.shape};
    border-left-color: ${color};
  `}
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 13px 24px;
  border-radius: 5px;
  border-left-width: 5px;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(15)}px;
  `}
`;

export const Amount = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
    font-size: ${RFValue(15)}px;
  `}
`;