import mongoose, { Document, Schema } from 'mongoose';

/* The code is defining a Mongoose schema for a people. */
const peopleSchema = new Schema({
    birth_year: { type: String },
    eye_color: { type: String },
    films: { type: [String], default: [] },
    gender: { type: String },
    hair_color: { type: String },
    height: { type: String },
    homeworld: { type: String },
    mass: { type: String },
    name: { type: String },
    skin_color: { type: String },
    species: { type: [String], default: [] },
    starships: { type: [String], default: [] },
    url: { type: String, unique: true },
    vehicles: { type: [String], default: [] },
}, { timestamps: true });

export interface IPeople extends Document {
    birth_year: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];
}

export default mongoose.model<IPeople>(
    'People',
    peopleSchema,
);