import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { useState } from "react";

import { Header } from "@components/Header";
import { SectionHeader } from "@components/SectionHeader";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input/input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/EmptyList";
import { Button } from "@components/Button";

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([])
  const route = useRoute()
  const { group } = route.params as RouteParams
  
  return (
    <Container>
      <Header isButtonVisible />

      <SectionHeader 
        title={group}
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

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item} 
            onRemove={() => {}}
          />
        )}

        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />

    </Container>
  )
}