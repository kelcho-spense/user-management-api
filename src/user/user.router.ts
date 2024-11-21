import express from 'express';

import { createUser, getUsers, getUserById, deleteUser, updateUser } from './user.controller';

const UserRouter = express.Router();  // Create a new router

UserRouter.post('/users', createUser);  // Create a new user

UserRouter.get('/users', getUsers); // Get all users

UserRouter.get('/users/:id', getUserById);  // Get a user by id

UserRouter.delete('/users/:id', deleteUser);  // Delete a user by id

UserRouter.put('/users/:id', updateUser);  // Update a user by id

export default UserRouter;