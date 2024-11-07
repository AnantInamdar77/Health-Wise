import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  age: number;
  healthGoals: string[];
  medicalHistory: string[];
}

const UserSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true // Trims whitespace
  },
  age: { 
    type: Number, 
    required: true,
    min: [1, 'Age must be greater than 0'], // Custom validation
  },
  healthGoals: { 
    type: [String], 
    required: true,
    default: [] // Default to an empty array
  },
  medicalHistory: { 
    type: [String], 
    required: true,
    default: [] // Default to an empty array
  },
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Optional index for faster searches by name
UserSchema.index({ name: 1 });

export default mongoose.model<IUser>('User', UserSchema);
