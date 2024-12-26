import { model, models, Schema, Types } from 'mongoose';

export interface ITagQuestion {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

// Pivot Table for tags and questions
const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    tag: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  },
  { timestamps: true }
);

// Check if the model is already created
const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>('TagQuestion', TagQuestionSchema);

export default TagQuestion;
