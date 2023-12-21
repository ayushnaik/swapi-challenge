import mongoose, { Document, Schema } from 'mongoose';

// Define the schema
const SpeciesSchema = new Schema({
    average_height: { type: String },
    average_lifespan: { type: String },
    classification: { type: String },
    designation: { type: String },
    eye_colors: { type: String },
    hair_colors: { type: String },
    homeworld: { type: String },
    language: { type: String },
    name: { type: String },
    people: { type: [String], default: [] },
    films: { type: [String], default: [] },
    skin_colors: { type: String },
    url: { type: String, unique: true },
});

// Define the interface
export interface ISpecies extends Document {
    average_height: string;
    average_lifespan: string;
    classification: string;
    designation: string;
    eye_colors: string;
    hair_colors: string;
    homeworld: string;
    language: string;
    name: string;
    people: string[];
    films: string[];
    skin_colors: string;
    url: string;
}

export default mongoose.model<ISpecies>('Species', SpeciesSchema);
