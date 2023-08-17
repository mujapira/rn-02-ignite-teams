import { Header } from '@components/Header';
import * as S from './styles';
import { SectionHeader } from '@screens/SectionHeader';

export function Groups() {
  return (
    <S.Container>
      <Header />
      <SectionHeader 
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
    </S.Container>    
  );
}

