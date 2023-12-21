import mongoose, { Document, Schema } from 'mongoose';

// Define the schema
const PlanetSchema = new Schema({
    climate: { type: String },
    diameter: { type: String },
    films: { type: [String], default: [] },
    gravity: { type: String },
    name: { type: String },
    orbital_period: { type: String },
    population: { type: String },
    residents: { type: [String], default: [] },
    rotation_period: { type: String },
    surface_water: { type: String },
    terrain: { type: String },
    url: { type: String, unique: true },
});

// Define the interface
export interface IPlanet extends Document {
    climate: string;
    diameter: string;
    films: string[];
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    residents: string[];
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
}

export default mongoose.model<IPlanet>('Planet', PlanetSchema);
