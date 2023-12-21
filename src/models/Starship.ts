import mongoose, { Document, Schema } from 'mongoose';

/* The code is defining a Mongoose schema for a starship. */
const starshipSchema = new Schema({
    MGLT: { type: String },
    cargo_capacity: { type: String },
    consumables: { type: String },
    cost_in_credits: { type: String },
    crew: { type: String },
    hyperdrive_rating: { type: String },
    length: { type: String },
    manufacturer: { type: String },
    max_atmosphering_speed: { type: String },
    model: { type: String },
    name: { type: String },
    passengers: { type: String },
    starship_class: { type: String },
    url: { type: String, unique: true },
}, { timestamps: true });

export interface IStarship extends Document {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    crew: string;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    // model: string;
    name: string;
    passengers: string;
    starship_class: string;
    url: string;
}

export default mongoose.model<IStarship>(
    'Starship',
    starshipSchema,
);