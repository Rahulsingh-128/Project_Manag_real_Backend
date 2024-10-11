import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../auth/types";

// Define an interface for the Project document
export interface IProject extends Document {
    _id: number;
    Project_Name: string;
    Details: string;
    Demo_Link: string;
    Github_repository: string;
    created_by: IUser['_id'];
    createdAt: Date;  // Auto-generated timestamp field
    updatedAt: Date;  // Auto-generated timestamp field
}

// Create the project schema
const projSchema: Schema<IProject> = new Schema({
    _id: { type: Number, required: true },
    Project_Name: { type: String, required: true },
    Details: { type: String, required: false },
    Demo_Link: { type: String, required: false },
    Github_repository: { type: String, required: false },
    created_by: { 
        type: Number,    // Refers to the User's _id field
        ref: 'User'  // Ensure that the project must have a creator
    }
},
    { timestamps: true }
);

// Create and export the model
const Project = mongoose.model<IProject>("Project", projSchema);
export default Project;  // This should work
