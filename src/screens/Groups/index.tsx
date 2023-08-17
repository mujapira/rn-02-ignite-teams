import { Header } from '@components/Header';
import * as S from './styles';
import { SectionHeader } from '@components/SectionHeader';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
  return (
    <S.Container>
      <Header />
      <SectionHeader 
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
       <GroupCard 
        title="Galera do Ignite" />
    </S.Container>    
  );
}

