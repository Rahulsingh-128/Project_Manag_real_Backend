import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Project document
export interface IProject extends Document {
    _id: number;
    Project_Name: string;
    Details: string;
    Demo_Link: string;
    Github_repository: string;
}

// Create the project schema
const projSchema: Schema<IProject> = new Schema({
    _id: { type: Number, required: true },
    Project_Name: { type: String, required: true },
    Details: { type: String, required: false },
    Demo_Link: { type: String, required: false },
    Github_repository: { type: String, required: false }
});

// Create and export the model
const Project = mongoose.model<IProject>("Project", projSchema);
export default Project;  // This should work
