import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { App } from './App';

vi.mock('./game/PhaserGame', () => ({
  initGame: vi.fn(() => ({
    destroy: vi.fn()
  }))
}));

describe('App Component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ id: '1', username: 'testuser' }));
    localStorage.setItem('token', 'fake-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render a dialogue when a custom event is triggered', async () => {
    render(<App />);
    
    // Create and dispatch a custom event inside act
    await act(async () => {
      const event = new CustomEvent('show-dialogue', {
        detail: { text: 'Welcome to Hitogashima!' }
      });
      window.dispatchEvent(event);
    });

    expect(await screen.findByText('Welcome to Hitogashima!')).toBeInTheDocument();
    expect(screen.getByText('Click to continue...')).toBeInTheDocument();
  });

  it('should clear the dialogue when clicked', async () => {
    render(<App />);

    await act(async () => {
      const event = new CustomEvent('show-dialogue', {
        detail: { text: 'Test Dialogue' }
      });
      window.dispatchEvent(event);
    });

    const dialog = await screen.findByText('Test Dialogue');
    
    await act(async () => {
      fireEvent.click(dialog);
    });

    expect(screen.queryByText('Test Dialogue')).not.toBeInTheDocument();
  });
});
