import { Document, model, models, Schema } from 'mongoose';
import { z } from 'zod';

import { UserSchema as UserValidationSchema } from '@/lib/validations';

export type IUser = z.infer<typeof UserValidationSchema>;

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Check if the model is already created
const User = models?.User || model<IUser>('User', UserSchema);

export default User;
