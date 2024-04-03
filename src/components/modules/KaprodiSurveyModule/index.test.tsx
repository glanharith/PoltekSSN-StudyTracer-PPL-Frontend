import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import KaprodiSurveyModule from '.';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('KaprodiSurveyModule', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });
  
  it('renders Daftar Survey text', () => {
    render(<KaprodiSurveyModule />);
    expect(screen.getByText('Daftar Survey')).toBeInTheDocument();
  });
});
