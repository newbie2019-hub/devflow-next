import { model, models, Schema, Types } from 'mongoose';

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}

const AccountSchema = new Schema<IAccount>(
  {
    // Foreign key equivalent for postgres or mysql
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

// Check if the model is already created
const Account = models?.Account || model<IAccount>('Account', AccountSchema);

export default Account;
