import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('renders a button with given text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies custom classes along with variant ones', () => {
    const { container } = render(<Button className="custom-class" variant="outline">Label</Button>);
    const button = container.firstChild as HTMLElement;
    
    expect(button).toHaveClass('custom-class');
    expect(button.className).toContain('border');
  });
});
