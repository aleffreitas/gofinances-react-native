import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const ActionButton = styled(RectButton)`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
  `}

  padding: 18px;
  border-radius: 5px;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.medium}
    font-size: ${RFValue(14)}px;
  `}
`;