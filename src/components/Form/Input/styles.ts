import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const InputData = styled(TextInput)`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    background-color: ${theme.colors.shape};
    color: ${theme.colors.text_dark};
  `};
  
  width: 100%;
  border-radius: 5px;
  padding: 18px 16px;
  margin-bottom: 8px;
`;