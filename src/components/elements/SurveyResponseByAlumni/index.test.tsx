import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import MockAdapter from 'axios-mock-adapter';
import axios from '@/utils/axios';
import { useToast } from '@chakra-ui/react';
import SurveyResponseByAlumni from './index';
import ResponseModule from '@/components/modules/ResponseModule';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockAxios = new MockAdapter(axios);
const mockRouterPush = jest.fn();
const mockRefetchData = jest.fn();

beforeEach(() => {
  mockAxios.reset();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockRouterPush,
  });
  (useToast as jest.Mock).mockClear();
  (useToast as jest.Mock).mockReturnValue(jest.fn());
  mockRefetchData.mockClear();
});

const mockSurveyId = '08e7679e-b4b3-4bbf-af5a-25119dff9cc2';
const mockRole = 'ADMIN';

const mockApiResponse = {
  message: 'Successfully got responses for survey',
  data: {
    id: mockSurveyId,
    type: 'CURRICULUM',
    title: 'Survey all question types',
    description: 'ada semua jenis pertanyaan',
    startTime: '2024-05-02T15:02:00.000Z',
    endTime: '2024-05-04T15:02:00.000Z',
    questions: [
      {
        id: 'b650537f-eaea-45f2-a02b-2bde540ca11a',
        type: 'CHECKBOX',
        question: "What's ur fav movie?",
        rangeFrom: null,
        rangeTo: null,
        order: 0,
        formId: mockSurveyId,
        options: [
          {
            id: '145cc617-d41e-49bf-98e2-3a27cbb591ef',
            label: 'Titanic',
            questionId: 'b650537f-eaea-45f2-a02b-2bde540ca11a',
            order: 0,
          },
          {
            id: '6c02191f-3a51-4146-8b49-a95f5ba03fed',
            label: 'Interstellar',
            questionId: 'b650537f-eaea-45f2-a02b-2bde540ca11a',
            order: 1,
          },
          {
            id: '0f585070-039c-4867-9cef-57e9f32e1022',
            label: 'The Hunger Games',
            questionId: 'b650537f-eaea-45f2-a02b-2bde540ca11a',
            order: 2,
          },
        ],
      },
      {
        id: 'c6c882a5-ad69-4d57-b5b2-95aaa322609f',
        type: 'RANGE',
        question: 'How would you describe your stress level?',
        rangeFrom: 1,
        rangeTo: 5,
        order: 2,
        formId: '08e7679e-b4b3-4bbf-af5a-25119dff9cc2',
        options: [],
      },
      {
        id: '97c9e6b0-ae78-458a-a776-6dc246c043d7',
        type: 'RADIO',
        question: 'Do you like One Direction?',
        rangeFrom: null,
        rangeTo: null,
        order: 1,
        formId: '08e7679e-b4b3-4bbf-af5a-25119dff9cc2',
        options: [
          {
            id: '8b673d12-2022-411f-b944-c28746d36f88',
            label: 'Yes',
            questionId: '97c9e6b0-ae78-458a-a776-6dc246c043d7',
            order: 0,
          },
          {
            id: '6b3e5818-a8ec-43a9-aa81-e81e37366856',
            label: 'No',
            questionId: '97c9e6b0-ae78-458a-a776-6dc246c043d7',
            order: 1,
          },
        ],
      },
      {
        id: '63382688-c6f6-4432-be4c-17b24eb75606',
        type: 'TEXT',
        question: 'Are you pretty?',
        rangeFrom: null,
        rangeTo: null,
        order: 3,
        formId: '08e7679e-b4b3-4bbf-af5a-25119dff9cc2',
        options: [],
      },
    ],
    alumniResponse: [
      {
        alumniId: 'b6e02c84-f321-4b4e-bff6-780c8cae17b3',
        npm: '2106634332',
        enrollmentYear: 2021,
        graduateYear: 2024,
        studyProgramId: '393f6a47-425e-4402-92b6-782d266e0193',
        name: 'Ghayda Rafa Hernawan',
        studyProgramName: 'Ilmu Komputer',
        answers: [
          {
            questionId: 'b650537f-eaea-45f2-a02b-2bde540ca11a',
            answer: 'Interstellar',
          },
          {
            questionId: 'b650537f-eaea-45f2-a02b-2bde540ca11a',
            answer: 'The Hunger Games',
          },
          {
            questionId: 'c6c882a5-ad69-4d57-b5b2-95aaa322609f',
            answer: '5',
          },
          {
            questionId: '63382688-c6f6-4432-be4c-17b24eb75606',
            answer: 'yes i am',
          },
          {
            questionId: '97c9e6b0-ae78-458a-a776-6dc246c043d7',
            answer: 'Yes',
          },
        ],
      },
      {
        alumniId: '0e640575-1f4f-417f-b8e9-7a49168c7dd9',
        npm: '2106612345',
        enrollmentYear: 2019,
        graduateYear: 2023,
        studyProgramId: '96e5b5ee-63d0-431d-a965-49dc0a3b5745',
        name: 'Rania Maharani',
        studyProgramName: 'Kriptografi',
        answers: [
          {
            questionId: 'b650537f-eaea-45f2-a02b-2bde540ca11a',
            answer: 'Titanic',
          },
          {
            questionId: 'c6c882a5-ad69-4d57-b5b2-95aaa322609f',
            answer: '5',
          },
          {
            questionId: '97c9e6b0-ae78-458a-a776-6dc246c043d7',
            answer: 'Yes',
          },
          {
            questionId: '63382688-c6f6-4432-be4c-17b24eb75606',
            answer: 'yes i am',
          },
        ],
      },
    ],
  },
};

describe('SurveyResponseByAlumni', () => {
  beforeEach(() => {
    mockAxios
      .onGet(`/survey/${mockSurveyId}/response-preview/alumni`)
      .reply(200, mockApiResponse);
    render(<ResponseModule surveyId={mockSurveyId} role={mockRole} />);
  });

  it('renders alumni responses correctly', async () => {
    render(<SurveyResponseByAlumni surveyId={mockSurveyId} role={mockRole} />);

    await waitFor(() => {
      expect(screen.getByText('Ghayda Rafa Hernawan')).toBeInTheDocument();
      expect(screen.getByText('2106634332')).toBeInTheDocument();
      expect(screen.getByText('Interstellar')).toBeInTheDocument();
      expect(screen.getByText('The Hunger Games')).toBeInTheDocument();
    });

    const alumniCount = mockApiResponse.data.alumniResponse.length;
    const alumniCountText = `1 dari ${alumniCount}`;
    const elements = await screen.findAllByText(alumniCountText);

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('navigates to the next alumni', async () => {
    render(<SurveyResponseByAlumni surveyId={mockSurveyId} role={mockRole} />);

    const individualButton = screen.getByText('Individual');
    fireEvent.click(individualButton);

    const nextButton = screen.getByText('Selanjutnya');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Rania Maharani')).toBeInTheDocument();
      expect(screen.getByText('2106612345')).toBeInTheDocument();
    });
  });

  it('navigates to the previous alumni', async () => {
    render(<SurveyResponseByAlumni surveyId={mockSurveyId} role={mockRole} />);

    const individualButton = screen.getByText('Individual');
    fireEvent.click(individualButton);

    const nextButton = screen.getByText('Selanjutnya');
    fireEvent.click(nextButton);

    const previousButton = screen.getByText('Sebelumnya');
    fireEvent.click(previousButton);

    await waitFor(() => {
      expect(screen.getByText('Ghayda Rafa Hernawan')).toBeInTheDocument();
      expect(screen.getByText('2106634332')).toBeInTheDocument();
    });
  });
});
