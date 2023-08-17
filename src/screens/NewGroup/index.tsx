import * as S from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { SectionHeader } from "@components/SectionHeader";
import { Input } from "@components/Input/input";

export function NewGroup() {
  return (
    <S.Container>
      <Header isButtonVisible />

      <S.Content>
        <S.Icon />

        <SectionHeader 
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input />

        <Button 
          title="Criar"
          style={{ marginTop: 20 }}
        />
      </S.Content>
    </S.Container>
  )
}

