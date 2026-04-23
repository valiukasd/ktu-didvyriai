"use client";

import { Button } from "@/components/ui/button";
import { registerToEvent } from "@/lib/actions/tickets";
import { useState } from "react";
import { toast } from "sonner";

interface RegisterTicketButtonProps {
    eventId: string;
}

export function RegisterTicketButton({ eventId }: RegisterTicketButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            await registerToEvent(eventId);
            toast.success("Successfully registered! Your ticket has been created.");
            window.location.reload();
        } catch (err) {
            const error = err as Error;
            toast.error(error.message || "Failed to register for the event");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleRegister} disabled={isLoading}>
            {isLoading ? "Registering..." : "Get Ticket"}
        </Button>
    );
}
