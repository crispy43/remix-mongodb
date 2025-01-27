import { Document, Schema } from 'mongoose';

import { db } from '~/.server/lib/mongodb';

export interface User extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const userSchema = new Schema<User>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

export const UserModel = db.models.User || db.model<User>('User', userSchema);
