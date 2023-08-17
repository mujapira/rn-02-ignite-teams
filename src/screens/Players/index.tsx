import { Header } from "@components/Header";
import { SectionHeader } from "@components/SectionHeader";

import { Container, Form } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input/input";

export function Players() {
  return (
    <Container>
      <Header isButtonVisible />

      <SectionHeader 
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon 
          icon="add" 
        />
      </Form>
    </Container>
  )
}