import { model, models, Schema, Types } from 'mongoose';

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: 'question' | 'answer';
  voteType: 'upvote' | 'downvote';
}

export interface IVoteDoc extends IVote, Document {}

const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ['question', 'answer'], required: true },
    voteType: { type: String, enum: ['upvote', 'downvote'], required: true },
  },
  { timestamps: true }
);

// Check if the model is already created
const Vote = models?.Account || model<IVote>('Vote', VoteSchema);

export default Vote;
