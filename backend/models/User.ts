import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  age: number;
  healthGoals: string[];
  medicalHistory: string[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  healthGoals: { type: [String], required: true },
  medicalHistory: { type: [String], required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
