"use server"

import { headers } from "next/headers"
import { auth } from "./config"

export const getSession = await auth.api.getSession({
    headers: await headers()
})
