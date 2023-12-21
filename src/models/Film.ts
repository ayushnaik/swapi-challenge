import mongoose, { Document, Schema } from 'mongoose';

/* The code is defining a Mongoose schema for a film. */
const filmSchema = new Schema({
    characters: { type: [String], default: [] },
    director: { type: String },
    episode_id: { type: Number },
    opening_crawl: { type: String }, // Adjust the data type as per your requirement
    planets: { type: [String], default: [] },
    producer: { type: String },
    release_date: { type: String },
    species: { type: [String], default: [] },
    starships: { type: [String], default: [] },
    title: { type: String },
    url: { type: String, unique: true },
    vehicles: { type: [String], default: [] },
}, { timestamps: true });

export interface IFilm extends Document {
    characters: string[];
    director: string;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];
}

export default mongoose.model<IFilm>(
    'Film',
    filmSchema,
);