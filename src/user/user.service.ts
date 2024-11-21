// server/src/services/chatService.ts
import { SqlQuerySpec } from '@azure/cosmos';
import { getUsersContainer } from '../config/cosmosClient';
import logger from '../utils/logger';
import { TUser } from '../schemas/userSchema';

export const saveUserService = async (user: TUser): Promise<Partial<TUser>> => {
    try {
        const usersContainer = getUsersContainer();
        const res = await usersContainer.items.create<TUser>(user);
        if (!res.resource) {
            throw new Error('Failed to save user.');
        }
        return res.resource;
    } catch (error: any) {
        throw error;
    }
};

export const updateUserService = async (user: Partial<TUser>): Promise<Partial<TUser>> => {
    try {
        const usersContainer = getUsersContainer();
        const res = await usersContainer.items.upsert(user);
        if (!res.resource) {
            throw new Error('Failed to update user.');
        }
        return res.resource;
    } catch (error: any) {
        throw error;
    }
};

export const fetchUsersService = async (): Promise<TUser[]> => {
    try {
        const usersContainer = getUsersContainer();
        const querySpec: SqlQuerySpec = {
            query: 'SELECT * FROM c ORDER BY c._ts DESC',
        };
        const { resources } = await usersContainer.items.query(querySpec).fetchAll();
        return resources;
    } catch (error: any) {
        throw error;
    }
};

export const fetchUserByIdService = async (id: string): Promise<TUser | null> => {
    try {
        const usersContainer = getUsersContainer();
        const { resource } = await usersContainer.item(id, id).read();
        if (!resource) {
            return null;
        }
        return resource;
    } catch (error: any) {
        throw error;
    }
};

export const deleteUserByIdService = async (id: string): Promise<void> => {
    try {
        const usersContainer = getUsersContainer();
       const {resource,item,diagnostics,statusCode} = await usersContainer.item(id, id).delete();
        console.log(resource)
        console.log(item)
        console.log(diagnostics)
        console.log(statusCode)
    } catch (error: any) {

        throw error;
    }
};
