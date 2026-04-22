"use server";

import { headers } from "next/headers";
import { parse, type InferOutput } from "valibot";
import { auth } from "../auth/config";
import { ProfileSchema } from "../schema";

export async function updateProfile(payload: InferOutput<typeof ProfileSchema>) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        throw new Error("Unauthorized"); // Zmogus neprisijunges
    }

    const values = parse(ProfileSchema, payload);

    return await auth.api.updateUser({
        body: {
            name: values.name,
        }
    });
}
