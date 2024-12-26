import { model, models, Schema, Types } from 'mongoose';

export interface IModel {}

const ModelSchema = new Schema<IModel>({}, { timestamps: true });

// Check if the model is already created
const Account = models?.Account || model<IModel>('User', ModelSchema);

export default Account;
