"use client";

import { render, screen } from '@testing-library/react';
import type { User } from 'better-auth';
import { describe, expect, it } from 'vitest';
import Navbar from './navbar';

describe('Navbar', () => {
    it('renders KTU TICKETS logo', () => {
        render(<Navbar />);
        expect(screen.getByText('KTU TICKETS')).toBeInTheDocument();
    });

    it('shows Log in and Register links when not authenticated', () => {
        render(<Navbar user={undefined} />);
        expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    });

    it('hides Log in and Register when authenticated', () => {
        const mockUser: User = {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            emailVerified: true,
            image: null,
        };
        render(<Navbar user={mockUser} />);
        expect(screen.queryByRole('link', { name: /log in/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument();
    });

    it('shows user navigation links when authenticated', () => {
        const mockUser: User = {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            emailVerified: true,
            image: null,
        };
        render(<Navbar user={mockUser} />);
        expect(screen.getByRole('link', { name: /my tickets/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /my events/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /account/i })).toBeInTheDocument();
    });

    it('shows Log out button when authenticated', () => {
        const mockUser: User = {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            emailVerified: true,
            image: null,
        };
        render(<Navbar user={mockUser} />);
        expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
    });

    it('hides Log out when not authenticated', () => {
        render(<Navbar user={undefined} />);
        expect(screen.queryByRole('button', { name: /log out/i })).not.toBeInTheDocument();
    });

    it('links navigate to correct pages', () => {
        const mockUser: User = {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            emailVerified: true,
            image: null,
        };
        render(<Navbar user={mockUser} />);
        expect(screen.getByRole('link', { name: /my tickets/i })).toHaveAttribute('href', '/tickets');
        expect(screen.getByRole('link', { name: /my events/i })).toHaveAttribute('href', '/events');
        expect(screen.getByRole('link', { name: /account/i })).toHaveAttribute('href', '/profile');
    });
});
