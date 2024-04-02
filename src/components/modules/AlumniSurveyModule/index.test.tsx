import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import { axios } from '@/utils';
import AlumniSurveyModule from '.';
import { useToast } from '@chakra-ui/react';
import MockAdapter from 'axios-mock-adapter';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

const mockProfile = {
  name: 'Alumni',
  alumni: {
    id: 'alumni-id',
    phoneNo: '123',
    npm: '123',
    enrollmentYear: 2020,
    graduateYear: 2024,
  },
};

const mockSurveys = [
  {
    id: '17a020b8-b114-451a-a90e-9ab61d3b08ad',
    type: 'CAREER',
    title: 'Survey 1',
    description: 'Survey Description',
    startTime: '2024-03-24T17:00:00.000Z',
    endTime: '2024-04-24T20:15:00.000Z',
    admissionYearFrom: 2020,
    admissionYearTo: 2023,
    graduateYearFrom: 2024,
    graduateYearTo: 2027,
    responses: [],
  },
  {
    id: 'f40ee7ec-1b5b-42b2-9925-e43423353561',
    type: 'CAREER',
    title: 'Survey 2',
    description: 'Survey Description',
    startTime: '2024-03-24T17:00:00.000Z',
    endTime: '2024-04-24T20:15:00.000Z',
    admissionYearFrom: 2020,
    admissionYearTo: 2023,
    graduateYearFrom: 2024,
    graduateYearTo: 2027,
    responses: [],
  },
];

const getSurvey = `/survey?admissionYear=${mockProfile.alumni.enrollmentYear}&graduateYear=${mockProfile.alumni.graduateYear}`;

describe('AlumniSurveyModule', () => {
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  it('fetches profile and surveys and renders them correctly', async () => {
    mockAxios.onGet('/profile').reply(200, mockProfile);
    mockAxios.onGet(getSurvey).reply(200, mockSurveys);

    render(<AlumniSurveyModule surveyType="CAREER" />);

    await waitFor(() => {
      expect(screen.getByText('Survey Karir')).toBeInTheDocument();
    });
  });

  it('displays error toast if profile request fails', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    mockAxios.onGet('/profile').reply(500);
    render(<AlumniSurveyModule surveyType="CAREER" />);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal',
        description: 'Gagal memuat tahun pengguna',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
  });
});
