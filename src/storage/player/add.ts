import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "./storageConfig";
import { getGroupPlayers } from "./getGroupPlayers";

export async function addPlayerInGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        //@ignite-teams:players-amigos:[]
        const groupPlayers = await getGroupPlayers(group)
        const playerCountInGroup = groupPlayers.filter(player => player.name === newPlayer.name)
        if (playerCountInGroup.length > 0){
            throw new AppError('Jogador já existe nesse time')
        }

        const storage = JSON.stringify([...groupPlayers, newPlayer])
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)

    } catch (error) {
        throw error;
    }
}