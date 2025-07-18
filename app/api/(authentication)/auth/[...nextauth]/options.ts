import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            await dbConnect();

            if (!profile?.email) {
                throw new Error("No Profile");
            }

            const username = profile.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

            await UserModel.findOneAndUpdate(

                { email: profile.email },
                {
                    $setOnInsert: {
                        email: profile.email,
                        username: username // Only if inserting
                    },
                    $set: {
                        name: profile.name
                    }
                },
                {
                    new: true,
                    upsert: true
                }
            );

            return true
        }

    },
};