import {z} from 'zod';


export const messageSchema = z.object({
    content: z.string()
    .min(10, {message:"Content must be at least 10 characters"})
    .max(300, {message:"Content is no more than 300 characters"}),
})