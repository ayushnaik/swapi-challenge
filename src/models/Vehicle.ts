import mongoose, { Document, Schema } from 'mongoose';

// Define the schema
const VehicleSchema = new Schema({
    cargo_capacity: { type: String },
    consumables: { type: String },
    cost_in_credits: { type: String },
    crew: { type: String },
    length: { type: String },
    manufacturer: { type: String },
    max_atmosphering_speed: { type: String },
    model: { type: String },
    name: { type: String },
    passengers: { type: String },
    pilots: { type: [String], default: [] },
    films: { type: [String], default: [] },
    url: { type: String, unique: true },
    vehicle_class: { type: String },
});

// Define the interface
export interface IVehicle extends Document {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    crew: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    // model: string;
    name: string;
    passengers: string;
    pilots: string[];
    films: string[];
    url: string;
    vehicle_class: string;
}

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
