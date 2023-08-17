import * as S from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { SectionHeader } from "@components/SectionHeader";
import { Input } from "@components/Input/input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('players', { group: 'Rocket' })
  }
  return (
    <S.Container>
      <Header isButtonVisible />

      <S.Content>
        <S.Icon />

        <SectionHeader 
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" />

        <Button 
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </S.Content>
    </S.Container>
  )
}