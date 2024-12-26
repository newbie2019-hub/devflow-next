import { model, models, Schema } from 'mongoose';

export interface ITag {
  name: string;
  questions: number;
}

const ModelSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Check if the model is already created
const Tag = models?.Tag || model<ITag>('Tag', ModelSchema);

export default Tag;
