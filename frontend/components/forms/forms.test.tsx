"use client";

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EventForm } from './event-form';
import { LoginForm } from './login-form';
import ProfileForm from './profile-form';

describe('Forms - LoginForm', () => {

    it('password input is of password type', () => {
        render(<LoginForm />);
        const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
        expect(passwordInput.type).toBe('password');
    });
});

describe('Forms - EventForm', () => {

    it('pre-fills form with initial data', () => {
        const initialData = {
            eventName: 'Tech Conference',
            location: 'San Francisco',
            ticketCount: 100,
            eventDate: new Date('2024-06-15'),
        };
        render(<EventForm initialData={initialData} />);

        expect((screen.getByLabelText(/event name/i) as HTMLInputElement).value).toBe('Tech Conference');
        expect((screen.getByLabelText(/location/i) as HTMLInputElement).value).toBe('San Francisco');
        expect((screen.getByLabelText(/ticket count/i) as HTMLInputElement).value).toBe('100');
    });
});

describe('Forms - ProfileForm', () => {
    const mockUser = {
        id: 'user-1',
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true,
        image: null,
    };

    it('renders form with user data', () => {
        render(<ProfileForm user={mockUser} />);
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    });

    it('pre-fills name field with user data', () => {
        render(<ProfileForm user={mockUser} />);
        const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
        expect(nameInput.value).toBe('John Doe');
    });

    it('pre-fills age field with user data', () => {
        render(<ProfileForm user={mockUser} />);
        const ageInput = screen.getByLabelText(/age/i) as HTMLInputElement;
        expect(ageInput.value).toBe('30');
    });
});
