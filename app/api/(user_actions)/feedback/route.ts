import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import FeedbackModel from "@/models/Feedback";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
    await dbConnect(); 
    try {
        const { email, userID, stars, description, type } = await request.json();

        const feedbackSchema = z.object({
            email: z.string()
                .email("Invalid email format"),
            userID: z.string()
                .min(1, "User ID is required"),
            stars: z.number()
                .min(1, "Rating must be at least 1 star")
                .max(5, "Rating cannot exceed 5 stars"),
            description: z.string()
                .min(5, "Feedback must be at least 5 characters long")
                .max(500, "Feedback cannot exceed 500 characters"),
            type: z.enum(['suggestion', 'compliment', 'issue'], {
                errorMap: () => ({ message: "Type must be 'suggestion', 'compliment', or 'issue'" })
            })
        });

        const result = feedbackSchema.safeParse({ email, userID, stars, description, type });
        if (!result.success) {
            const errors = result.error.format();
            const errorMessages = Object.values(errors)
                .filter(error => Array.isArray(error))
                .flat()
                .join(', ');
            
            console.log("Validation errors:", result.error.format());
            return NextResponse.json(
                {
                    success: false,
                    message: errorMessages || 'Invalid input data'
                },
                { status: 400 }
            );
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            console.log("User not found");
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const feedback_object = {
            email,
            userID,
            stars,
            description,
            type,
        };

        const feedback = new FeedbackModel(feedback_object);
        await feedback.save();
        
        console.log("Feedback added successfully");
        return NextResponse.json(
            { success: true, message: "Feedback added successfully" },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error adding feedback:", error);
        return NextResponse.json(
            { success: false, message: "Failed to add feedback" },
            { status: 500 }
        );
    }
}