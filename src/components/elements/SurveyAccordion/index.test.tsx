import React from 'react';
import { render, screen } from '@testing-library/react';
import SurveyAccordion from '.';
import { FormType } from '../SurveyCard/interface';
import { Accordion } from '@chakra-ui/react';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('SurveyAccordion component', () => {
  const mockSurveys = [
    {
      id: '1',
      type: FormType.CAREER,
      title: 'Survey 1',
      description: 'Description for Survey 1',
      startTime: new Date('2024-04-01T09:00:00Z'),
      endTime: new Date('2024-04-07T17:00:00Z'),
    },
    {
      id: '2',
      type: FormType.CAREER,
      title: 'Survey 2',
      description: 'Description for Survey 2',
      startTime: new Date('2024-04-08T09:00:00Z'),
      endTime: new Date('2024-04-14T17:00:00Z'),
    },
  ];

  it('renders survey accordion with title and surveys', () => {
    render(
      <Accordion>
        <SurveyAccordion
          title="My Surveys"
          surveys={mockSurveys}
          admin={true}
        />
      </Accordion>,
    );

    expect(screen.getByText('My Surveys')).toBeInTheDocument();

    expect(screen.getByText('Survey 1')).toBeInTheDocument();
    expect(screen.getByText('Description for Survey 1')).toBeInTheDocument();

    expect(screen.getByText('Survey 2')).toBeInTheDocument();
    expect(screen.getByText('Description for Survey 2')).toBeInTheDocument();
  });

  it('renders "Belum ada survey" message when surveys array is empty', () => {
    render(
      <Accordion>
        <SurveyAccordion title="My Surveys" surveys={[]} admin={true} />
      </Accordion>,
    );

    expect(screen.getByText('Belum ada survey')).toBeInTheDocument();
  });
});
