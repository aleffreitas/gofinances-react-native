import React, { ReactNode } from 'react';

import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Register } from '.';

function Providers({ children }: {children: ReactNode}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

describe('Register Screen', () => {
  it('should be open category modal when user click on button', async()=> {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');
    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });

  });
});
