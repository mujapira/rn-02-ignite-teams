import { Header } from '@components/Header';
import * as S from './styles';
import { SectionHeader } from '@components/SectionHeader';
import { GroupCard } from '@components/GroupCard';
import { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAllGroups } from '@storage/group/getAll';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await getAllGroups()
      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(groupName: string) {
    navigation.navigate('players', { group: groupName })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <S.Container>
      <Header />
      <SectionHeader 
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
       <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            onPress={() => handleOpenGroup(item)}
            title={item} 
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </S.Container>    
  );
}

