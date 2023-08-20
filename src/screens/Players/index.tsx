import { useEffect, useState, useRef} from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { useNavigation, useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { SectionHeader } from "@components/SectionHeader";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input/input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/EmptyList";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { addPlayerInGroup } from "@storage/player/add";
import { getGroupTeamPlayers } from "@storage/player/getGroupTeamPlayers";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { removePlayer } from "@storage/player/removeFromGroup";
import { deleteGroup } from "@storage/group/deleteGroup";

type RouteParams = {
  group: string
}

type Player = {
  name: string
  team: string
}

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const route = useRoute()
  const { group } = route.params as RouteParams
  const newPlayerNameInputRef = useRef<TextInput>(null)
  const navigation =  useNavigation()

  async function handleAddPlayer(){
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Adicionar pessoa', 'O nome da pessoa não pode ser vazio')
    }

    const newPlayer:Player = {
      name: newPlayerName,
      team
    }

    try {
      await addPlayerInGroup(newPlayer, group)
      newPlayerNameInputRef.current?.blur()
      fetchTeamPlayers()
      setNewPlayerName('')

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Adicionar nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Adicionar nova pessoa', 'Erro ao adicionar nova pessoa')
      }
    }
  }

  async function fetchTeamPlayers(){
    try {
      const teamPlayers = await getGroupTeamPlayers(group, team)
      setPlayers(teamPlayers)
    } catch (error){
      console.log(error)
      Alert.alert('Erro ao buscar pessoas', 'Erro ao buscar as pessoas do time selecionado')
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayer(playerName, group)
      fetchTeamPlayers()
    } catch (error) {
      Alert.alert('Erro ao remover pessoa', 'Erro ao remover a pessoa selecionada')
    } 
  }

  async function removeAction() {
    try {
      await deleteGroup(group)
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Erro ao remover grupo', 'Erro ao remover o grupo selecionado')
    }
  }

  async function handleDelete() {
    try {
      Alert.alert(
        'Deletar',
        'Deseja excluir esse grupo?',
        [
          {text: 'Não', style:"cancel"},
          {text: 'Sim', onPress: () => removeAction()}
        ]
        )
      } catch (error) {
        Alert.alert('Erro ao remover grupo', 'Erro ao remover o grupo selecionado')
      }
  }
  useEffect(()=> {
    fetchTeamPlayers()
  }, [team])

  return (
    <Container>
      <Header isButtonVisible />

      <SectionHeader 
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon 
          onPress={handleAddPlayer}
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name} 
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}

        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button 
        title="Remover Grupo"
        type="SECONDARY"
        onPress={handleDelete}
      />

    </Container>
  )
}