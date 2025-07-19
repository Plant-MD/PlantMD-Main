import mongoose, { Schema, Document } from "mongoose";

export interface Feedback extends Document {
    email: string;
    userID?: string;
    stars: number;
    description: string;
    updatedAt: boolean;
    createdAt: boolean;
}

const FeedbackSchema: Schema = new Schema({
    email: { type: String, required: true, trim: true, lowercase: true },
    userID: { type: String, required: true },
    stars: { type: Number, required: true, min: 0, max: 5 },
    description: { type: String, required: true },
},
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);


const FeedbackModel = (mongoose.models.Feedback as mongoose.Model<Feedback>) || (mongoose.model<Feedback>('Feedback', FeedbackSchema));

export default FeedbackModel;