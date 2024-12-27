import { model, models, Schema, Types } from 'mongoose';

export interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: 'question' | 'answer';
}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    // Either questionId or answerId will be present
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, enum: ['question', 'answer'], required: true },
  },
  { timestamps: true }
);

// Check if the model is already created
const Interaction =
  models?.Interaction || model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;