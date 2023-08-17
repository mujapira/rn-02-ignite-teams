import * as S from "./styles";

import logoImg from '@assets/logo.png';

type Props = {
  isButtonVisible?: boolean;
}

export function Header({isButtonVisible = false} : Props) {
  return (
    <S.Container>
      {
        isButtonVisible && 
        <S.ButtonWrapper>
          <S.Icon />
        </S.ButtonWrapper>
      }
      <S.Logo source={logoImg} />
    </S.Container>
  )
} 