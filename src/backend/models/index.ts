import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema<any>({
  name: { type: String, default: null },
  roles: { type: [String], enum: ['admin', 'customer'], default: null },
  purchases: { type: [Schema.Types.Mixed], default: null },
  cart: {
    items: { type: Schema.Types.Mixed, default: null }
  },
  skipSync: { type: Boolean, default: null },
  email: { type: String, required: true, unique: true },
  resetPasswordToken: { type: String, default: null },
  salt: { type: String, default: null },
  hash: { type: String, default: null },
  loginAttempts: { type: Number, default: null },
  password: { type: String, required: true }
}, { timestamps: true });

export const User = mongoose.model<any>('User', UserSchema);