import { Request, Response } from "express";
import { saveUserService, updateUserService, fetchUsersService, fetchUserByIdService, deleteUserByIdService } from "./user.service";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (req: Request, res: Response) => {
    try {
        //validate the request body with ZOD schema
        const parsedBody = createUserSchema.parse(req.body);

        if (parsedBody) {
            //generate a unique ID & createdAT for the user
            let newUser = { ...parsedBody, id: uuidv4(), createdAt: new Date() };

            const savedUser = await saveUserService(newUser);

            res.status(201).json(savedUser);
        }

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await fetchUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).json({ message: "User ID is required" });

        const user = await fetchUserByIdService(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) res.status(400).json({ message: "User ID is required" });

        await deleteUserByIdService(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) res.status(400).json({ message: "User ID is required" });

        const parsedBody = updateUserSchema.parse(req.body);

        const userUpdatedUser = { ...parsedBody, id: id };

        const updatedUser = await updateUserService(userUpdatedUser);

        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
