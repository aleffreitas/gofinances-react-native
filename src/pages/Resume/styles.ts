import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";


export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
  `}
  flex: 1;
`;

export const Header = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
  `}
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.regular};
  `}
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    padding: 24
  }
})``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;