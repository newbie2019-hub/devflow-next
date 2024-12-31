import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please provide a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(60, { message: 'Password cannot exceed 60 characters' }),
});

export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please provide a valid email address' }),
  username: z.string().min(1, { message: 'Email is required' }),
  name: z.string().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(60, { message: 'Password cannot exceed 60 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number.',
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title is required' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),

  content: z.string().min(1, { message: 'Body is required' }),

  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Tag is required' })
        .max(30, { message: 'Tag cannot exceed 30 characters' })
    )
    .min(1, { message: 'At least one tag is required' })
    .max(3, { message: 'Cannot add more than 3 tags' }),
});

//Based on the User model in database/user.model.ts
export const UserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  email: z.string().email({ message: 'Please provide a valid email address' }),
  bio: z.string().optional(),
  image: z
    .string()
    .url({ message: 'Please provide a valid image URL' })
    .optional(),
  location: z.string().optional(),
  portfolio: z.string().optional(),
  reputation: z.number().optional(),
});
