import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION, GROUP_COLLECTION } from "@storage/storageConfig";
import { getAllGroups } from './getAll';

export async function deleteGroup(groupToDelete: string) {
  try {
    const storage = await getAllGroups();
    const groupsWithoutDeletedOne = storage.filter(group => group !== groupToDelete)

    await AsyncStorage.setItem(`${GROUP_COLLECTION}`, JSON.stringify(groupsWithoutDeletedOne));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToDelete}`);
  } catch (error) {
    throw error;
  }
}
