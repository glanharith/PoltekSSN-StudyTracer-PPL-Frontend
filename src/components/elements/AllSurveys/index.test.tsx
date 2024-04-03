import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { useToast } from '@chakra-ui/react';
import AllSurveys from '.';
import { axios } from '@/utils';
import MockAdapter from 'axios-mock-adapter';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('AllSurveys component', () => {
  const today = new Date();
  const oneDayAgo = new Date(today);
  oneDayAgo.setDate(today.getDate() - 1); // One day ago
  const oneDayLater = new Date(today);
  oneDayLater.setDate(today.getDate() + 1); // One day later

  const mockSurveys = {
    data: {
      data: [
        {
          id: '1',
          type: 'CURRICULUM',
          title: 'Survey 1',
          description: 'Survey 1',
          startTime: oneDayAgo,
          endTime: oneDayLater,
        },
        {
          id: '2',
          type: 'CAREER',
          title: 'Survey 2',
          description: 'Survey 2',
          startTime: new Date('2024-04-08T09:00:00Z'),
          endTime: new Date('2024-04-14T17:00:00Z'),
        },
      ],
    },
  };

  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.reset();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  it('renders all survey accordions', async () => {
    mockAxios.onGet('/survey/all').reply(200, mockSurveys);
    await act(async () => {
      render(<AllSurveys role="ADMIN" />);
    });

    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
    });

    expect(screen.getByText('SURVEY KURIKULUM')).toBeInTheDocument();
    expect(screen.getByText('SURVEY KARIR')).toBeInTheDocument();

    const akanDatangElements = screen.queryAllByText('Akan datang');
    const sedangBerlangsungElements = screen.queryAllByText('Sedang berlangsung');
    const sudahBerakhirElements = screen.queryAllByText('Sudah berakhir');

    expect(akanDatangElements).toHaveLength(2);
    expect(sedangBerlangsungElements).toHaveLength(2);
    expect(sudahBerakhirElements).toHaveLength(2);
  });
});



