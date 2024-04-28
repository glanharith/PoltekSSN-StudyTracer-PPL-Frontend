import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import AdminSurveyModule from '.';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AdminSurveyModule', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });
  it('renders Daftar Survey text', () => {
    render(<AdminSurveyModule />);
    expect(screen.getByText('Daftar Survey')).toBeInTheDocument();
  });

  it('calls navigateToCreate when Tambah Survey button is clicked', () => {
    render(<AdminSurveyModule />);
    fireEvent.click(screen.getByText('Tambah Survey'));
    expect(useRouter().push).toHaveBeenCalledWith('/survey-management/create');
  });
});
