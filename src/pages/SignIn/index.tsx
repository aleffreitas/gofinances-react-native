import React from 'react';
import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from './styles';

import AppleIcon from '../../assets/apple.svg';
import GoogleIcon from '../../assets/google.svg';
import LogoIcon from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

export function SignIn(){

  const { user } = useAuth();

  console.log(user);

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
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleIcon}
          />
          <SignInSocialButton
            title='Entrar com Apple'
            svg={AppleIcon}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}