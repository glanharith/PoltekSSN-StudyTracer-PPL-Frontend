import React from 'react';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';
import { act, render, screen, waitFor } from '@testing-library/react';

import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

import SurveyResponseDataPreview from '.';

describe('SurveyResponseDataPreview component', () => {
  const mockSurvey = {
    title: 'ini survey buat test',
    description: 'halo semuanya tolong isi',
    totalRespondents: 1,
    answerStats: [
      {
        question: 'woi dijawab dong',
        questionType: 'TEXT',
        data: [ 'iya ini gua jawab elah' ]
      },
      {
        question: 'pilih 1 ya ges',
        questionType: 'RADIO',
        data: [
          { optionLabel: 'satu', optionAnswersCount: 1, percentage: '100.00%' },
          { optionLabel: 'dua ', optionAnswersCount: 0, percentage: '0.00%' },
          { optionLabel: 'tiga', optionAnswersCount: 0, percentage: '0.00%' }
        ]
      },
      {
        question: 'ini bebas pilih berapa',
        questionType: 'CHECKBOX',
        data: [
          { optionLabel: 'satu', optionAnswersCount: 1, percentage: '100.00%' },
          { optionLabel: 'dua', optionAnswersCount: 1, percentage: '100.00%' },
          { optionLabel: 'tiga', optionAnswersCount: 0, percentage: '0.00%' }
        ]
      },
      {
        question: 'ini pilih 1 pake skala',
        questionType: 'RANGE',
        data: [
          { optionLabel: '1', optionAnswersCount: 0, percentage: '0.00%' },
          { optionLabel: '2', optionAnswersCount: 0, percentage: '0.00%' },
          { optionLabel: '3', optionAnswersCount: 1, percentage: '100.00%' }
        ]
      }
    ],
    message: 'Respon Survei'
  };
  const mockAxios = new MockAdapter(axios);
  const mockUseToast = useToast as jest.Mock;

  beforeEach(() => {
    mockAxios.reset();
    mockUseToast.mockReturnValue(jest.fn());
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn()
    })
    mockUseToast.mockClear();
    mockUseToast.mockReturnValue(jest.fn());
  });


  it('renders correctly', async () => {
    mockAxios.onGet(
      'survey/8c481468-8175-4d4b-90fa-12291c2467f6/response-preview/questions'
    ).reply(200, mockSurvey);

    render(
      <SurveyResponseDataPreview surveyId="8c481468-8175-4d4b-90fa-12291c2467f6" />
    );

    await waitFor(() => {
      expect(screen.getByText(mockSurvey.title)).toBeInTheDocument();
      expect(screen.getByText(mockSurvey.description)).toBeInTheDocument();
      const allMatchingElements = screen.getAllByText(`${mockSurvey.totalRespondents} jawaban`);
      expect(allMatchingElements.length).toBe(mockSurvey.answerStats.length + 1);
      for (let i = 0; i < mockSurvey.answerStats.length; i++) {
        expect(screen.getByText(mockSurvey.answerStats[i].question)).toBeInTheDocument();
      }
    });
  });

  it('renders correctly for survey with no question', async () => {
    const mockNoQuestionSurvey = {
      title: 'ini survey buat test',
      description: 'halo semuanya tolong isi',
      totalRespondents: 0,
      answerStats: [],
      message: 'Survei belum memiliki pertanyaan'
    }

    mockAxios.onGet(
      'survey/8c481468-8175-4d4b-90fa-12291c2467f6/response-preview/questions'
    ).reply(200, mockNoQuestionSurvey);

    render(
      <SurveyResponseDataPreview surveyId="8c481468-8175-4d4b-90fa-12291c2467f6" />
    );

    await waitFor(() => {
      expect(screen.getByText(mockNoQuestionSurvey.title)).toBeInTheDocument();
      expect(screen.getByText(mockNoQuestionSurvey.description)).toBeInTheDocument();
      expect(screen.getByText(`${mockNoQuestionSurvey.totalRespondents} jawaban`)).toBeInTheDocument();
      expect(screen.getByText(mockNoQuestionSurvey.message)).toBeInTheDocument();
    });
  });

  it('shows toast when data retrieval fails', async () => {
    mockAxios.onGet(
      'survey/8c481468-8175-4d4b-90fa-12291c2467f6/response-preview/questions'
    ).reply(404, `Survei dengan ID 8c481468-8175-4d4b-90fa-12291c2467f6 tidak ditemukan`);

    render(
      <SurveyResponseDataPreview surveyId="8c481468-8175-4d4b-90fa-12291c2467f6" />
    );

    await waitFor(() => {
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Gagal memuat data survey',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      expect(useRouter().replace).toHaveBeenCalledWith('/');
    })
  });
});
