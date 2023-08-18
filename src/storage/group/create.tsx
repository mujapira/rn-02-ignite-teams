import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "./storageConfig";
import { getAllGroups } from "./getAll";
import { AppError } from "@utils/AppError";

export async function createNewGroup(newGroupName: string) {
    try {
        const storedGroups = await getAllGroups()

        const groupAlreadyExists = storedGroups.find(group => group === newGroupName)

        if (groupAlreadyExists) {
            throw new AppError('Grupo já existe')
        }
        const storage = JSON.stringify([...storedGroups, newGroupName])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    } catch (error) {
        throw error;
    }
}