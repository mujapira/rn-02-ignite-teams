import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGroupPlayers } from './getGroupPlayers';
import { PLAYER_COLLECTION } from "./storageConfig";

export async function removePlayer(playerName: string, group: string) {
  try {
    const storage = await getGroupPlayers(group);

    const filteredPlayers = storage.filter(player => player.name != playerName)
    const players = JSON.stringify(filteredPlayers);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}