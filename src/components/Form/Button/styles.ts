import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const ActionButton = styled(TouchableOpacity)`
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