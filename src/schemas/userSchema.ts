
import { z } from 'zod';

const coerceDate = z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
    }
}, z.date());

export const userSchema = z.object({
    id: z.string().uuid(),
    fullname: z.string(),
    email: z.string().email(),
    address: z.string(),
    createdAt: coerceDate.default(() => new Date()),
})

export const createUserSchema = userSchema.omit({ id: true, createdAt: true });
export const updateUserSchema = userSchema.omit({ id: true, createdAt: true });

export type TUser = z.infer<typeof userSchema>;