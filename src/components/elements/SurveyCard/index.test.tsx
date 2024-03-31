import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SurveyCard from './index';
import { Survey, CardProps, FormType } from './interface';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouterPush = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: mockRouterPush,
  });
});


const mockSurvey: Survey = {
    id: "4c948af3-c4a5-4a14-9d8b-c4c0202930dc",
    type: FormType.CAREER,
    title: "Sample Survey",
    description: "Survey Description",
    startTime: new Date("2024-03-24T17:00:00.000Z"),
    endTime: new Date("2024-04-24T20:15:00.000Z"),
    admissionYearFrom: 2020,
    admissionYearTo: 2023,
    graduateYearFrom: 2024,
    graduateYearTo: 2027,
    responses: []
};

const mockCardProps: CardProps = {
  survey: mockSurvey,
  fillButton: true,
  deleteButton: true,
  editButton: true,
  downloadButton: true,
  previewButton: true,
  isDisabled: false,
};

describe('SurveyCard', () => {
  it('renders survey title', () => {
    render(<SurveyCard {...mockCardProps} />);
    const titleElement = screen.getByText('Sample Survey');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders survey description', () => {
    render(<SurveyCard {...mockCardProps} />);
    const descriptionElement = screen.getByText('Survey Description');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('navigateToFill redirects to correct URL', () => {
    render(<SurveyCard {...mockCardProps} />);
    fireEvent.click(screen.getByText('Isi Survey'));
    expect(mockRouterPush).toHaveBeenCalledWith(`/survey/${mockSurvey.id}`);
  });

  it('navigateToPreview redirects to correct URL', () => {
    render(<SurveyCard {...mockCardProps} />);
    fireEvent.click(screen.getByText('Pratinjau'));
    expect(mockRouterPush).toHaveBeenCalledWith(`/survey-management/preview/${mockSurvey.id}`);
  });

  
});
