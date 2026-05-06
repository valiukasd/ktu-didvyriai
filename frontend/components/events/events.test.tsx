import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EventCard } from './event-card';
import { RegisterTicketButton } from './register-ticket-button';

describe('Events - EventCard', () => {
    const mockEvent = {
        id: '1',
        eventName: 'Tech Conference',
        eventDate: new Date('2024-06-15'),
        location: 'San Francisco',
        ticketCount: 50,
        minimumAge: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
        creatorId: 'creator-1',
    };

    it('renders event name', () => {
        render(<EventCard event={mockEvent} />);
        expect(screen.getByText('Tech Conference')).toBeInTheDocument();
    });

    it('renders event location', () => {
        render(<EventCard event={mockEvent} />);
        expect(screen.getByText(/San Francisco/)).toBeInTheDocument();
    });

    it('renders ticket count', () => {
        render(<EventCard event={mockEvent} />);
        expect(screen.getByText(/50/)).toBeInTheDocument();
    });

    it('renders minimum age when provided', () => {
        render(<EventCard event={mockEvent} />);
        expect(screen.getByText(/18\+/)).toBeInTheDocument();
    });

    it('does not render minimum age when null', () => {
        const eventWithoutAge = { ...mockEvent, minimumAge: null };
        render(<EventCard event={eventWithoutAge} />);
        expect(screen.queryByText(/minimum age/i)).not.toBeInTheDocument();
    });

    it('shows View Details link for non-owners', () => {
        render(<EventCard event={mockEvent} isOwner={false} />);
        const link = screen.getByRole('link', { name: /view details/i });
        expect(link).toHaveAttribute('href', `/events/${mockEvent.id}`);
    });

    it('shows View link for owners', () => {
        render(<EventCard event={mockEvent} isOwner={true} />);
        expect(screen.getByRole('link', { name: /^view$/i })).toBeInTheDocument();
    });

    it('shows Edit button for owners', () => {
        render(<EventCard event={mockEvent} isOwner={true} />);
        expect(screen.getByRole('link', { name: /edit/i })).toBeInTheDocument();
    });

    it('shows Delete button for owners', () => {
        render(<EventCard event={mockEvent} isOwner={true} />);
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    });

    it('hides owner buttons for non-owners', () => {
        render(<EventCard event={mockEvent} isOwner={false} />);
        expect(screen.queryByRole('link', { name: /edit/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
    });
});


describe('Events - RegisterTicketButton', () => {
    it('renders Get Ticket button', () => {
        render(<RegisterTicketButton eventId="event-123" />);
        expect(screen.getByRole('button', { name: /get ticket/i })).toBeInTheDocument();
    });

    it('button is not disabled initially', () => {
        render(<RegisterTicketButton eventId="event-123" />);
        expect(screen.getByRole('button', { name: /get ticket/i })).not.toBeDisabled();
    });
});
