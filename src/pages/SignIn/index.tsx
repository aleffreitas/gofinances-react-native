import React, { useState } from 'react';
import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from './styles';

import AppleIcon from '../../assets/apple.svg';
import GoogleIcon from '../../assets/google.svg';
import LogoIcon from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle(){
    try {
      setIsLoading(true);
      return await signInWithGoogle();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple(){
    try {
      setIsLoading(true);
      return await signInWithApple();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
      setIsLoading(false);
    }    
  }


  return(
    <Container>
      <Header>
        <TitleWrapper>
          <LogoIcon
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <GestureHandlerRootView>
            <SignInSocialButton
              title='Entrar com Google'
              svg={GoogleIcon}
              onPress={handleSignInWithGoogle}
            />
            <SignInSocialButton
              title='Entrar com Apple'
              svg={AppleIcon}
              onPress={handleSignInWithApple}
            />
          </GestureHandlerRootView>
        </FooterWrapper>

        {isLoading && <ActivityIndicator color={theme.colors.shape} />}
      </Footer>
    </Container>
  );
}