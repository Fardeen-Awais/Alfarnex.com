import { currentUser } from "@clerk/nextjs";

import { db } from "./db";


export const homeProfile = async () => {
    // Get the current user
    const user = await currentUser();

    // If there is no user, redirect to sign in
    if (!user) {
        return null
    }

    // Check if the user's profile already exists in the database
    const profile = await db.profile.findUnique({
        where: {
            userId: user?.id
        }
    });

    // If the profile exists, return it
    if (profile) {
        return profile;
    }

    // Create a new profile for the user
    if (!profile) {
        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });

        return newProfile;
    }
}