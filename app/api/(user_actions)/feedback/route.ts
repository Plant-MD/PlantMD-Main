import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import dbConnect from "@/lib/dbConnect";
import FeedbackModel from "@/models/Feedback";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
    await dbConnect(); // Ensure DB connection
    try {
        const { email, userID, stars, description } = await request.json();

        const emailSchema = z.object({
            email: z.string()
                .email("Invalid email format")
        })

        const result = emailSchema.safeParse({ email });
        if (!result.success) {
            const emailErrors = result.error.format().email?._errors || [];
            console.log(result.error.format());
            return Response.json(
                {
                    success: false,
                    message: emailErrors?.length > 0 ? emailErrors.join(', ') : 'Invalid query parameters'
                },
                { status: 400 });
        }

        const user = UserModel.findById(userID);
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
            description
        }


        const Feedback = new FeedbackModel(feedback_object);
        await Feedback.save();
        console.log("Feedback added successfully");
        return NextResponse.json(
            { success: true, message: "Feedback added successfully" },
            { status: 200 }
        );

    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to add newsletter" },
            { status: 500 }
        );
    }
}