import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
  `}
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.title};
    font-family: ${theme.fonts.bold};
  `}
  font-size: 24px;
`;