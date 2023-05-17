import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Button = styled(RectButton)`
  ${({ theme }) => css`
    background-color: ${theme.colors.shape};
  `}
  height: ${RFValue(56)}px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  ${({ theme }) => css`
    border-color: ${theme.colors.background};
  `}
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-right-width: 1px;
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
  `}
  font-size: ${RFValue(14)}px;
  flex: 1;
  text-align: center;
`;