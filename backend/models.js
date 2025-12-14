/**
 * MONGODB SCHEMAS (Node.js Backend Reference)
 * 
 * Use these schemas with Mongoose in your Node.js application.
 * Ideally, place each schema in a separate file (e.g., models/User.js).
 */

import mongoose from 'mongoose';

// --- 1. User Schema ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // Store hashed passwords (e.g., using bcrypt)
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);

// --- 2. Tour Package Schema ---
const tourPackageSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  duration: { type: String, required: true }, // e.g. "3 Days"
  price: { type: String, required: true }, // e.g. "$1,500"
  image: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  highlights: [{ type: String }],
  dailyItinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Tour = mongoose.model('Tour', tourPackageSchema);

// --- 3. Booking Schema ---
const bookingSchema = new mongoose.Schema({
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  tourTitle: { type: String, required: true }, // Snapshot of title
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  travelers: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  totalPrice: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', bookingSchema);

// --- 4. Story Schema (Reviews/Blogs) ---
const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  role: { type: String }, // e.g. "Solo Traveler"
  authorImage: { type: String },
  coverImage: { type: String },
  excerpt: { type: String },
  content: [{ type: String }], // Array of paragraphs
  rating: { type: Number, min: 1, max: 5, default: 5 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export const Story = mongoose.model('Story', storySchema);
