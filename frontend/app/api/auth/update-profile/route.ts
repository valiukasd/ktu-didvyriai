import { updateProfile } from "@/lib/auth/helpers";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const user = await updateProfile(body);
		return Response.json({ success: true, user });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Internal server error";
		return Response.json(
			{ error: message },
			{ status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 }
		);
	}
}
