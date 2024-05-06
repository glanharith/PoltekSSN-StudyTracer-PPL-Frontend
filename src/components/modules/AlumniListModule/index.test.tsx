import MockAdapter from 'axios-mock-adapter';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { AlumniListModule } from '.';
import { axios } from '@/utils';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('AlumniListModule', () => {
  const mockAxios = new MockAdapter(axios);

  afterEach(() => {
    mockAxios.reset();
  });

  test('renders alumni list correctly', async () => {
    const alumniData = [
      {
        id: 1,
        name: 'Alumni 1',
        email: 'alumni1@example.com',
        alumni: {
          npm: '123456',
          phoneNo: '08123456789',
          address: 'Depok',
          gender: 'MALE',
          enrollmentYear: 2020,
          graduateYear: 2024,
          studyProgram: { name: 'CS' },
        },
      },
      {
        id: 2,
        name: 'Alumni 2',
        email: 'alumni2@example.com',
        alumni: {
          npm: '789012',
          phoneNo: '08987654321',
          address: 'Jakarta',
          gender: 'FEMALE',
          enrollmentYear: 2019,
          graduateYear: 2023,
          studyProgram: { name: 'CS' },
        },
      },
    ];

    mockAxios.onGet('/alumni?page=1').reply(200, {
      data: {
        users: alumniData,
        pagination: { page: 1, from: 1, to: 2, totalAlumni: 2, totalPage: 1 },
      },
    });

    act(() => {
      render(<AlumniListModule />);
    });

    await waitFor(() => {
      expect(screen.getByText('Daftar Alumni')).toBeInTheDocument();
      expect(screen.getByText('Menampilkan 1 - 2 dari 2')).toBeInTheDocument();
    });
  });

  test('opens modal with alumni detail when alumni clicked', async () => {
    const alumniData = {
      id: 1,
      name: 'Alumni 1',
      email: 'alumni1@example.com',
      alumni: {
        npm: '123456',
        phoneNo: '08123456789',
        address: 'Depok',
        gender: 'MALE',
        enrollmentYear: 2020,
        graduateYear: 2024,
        studyProgram: { name: 'IT' },
      },
    };

    mockAxios.onGet('/alumni?page=1').reply(200, {
      data: {
        users: [alumniData],
        pagination: { page: 1, from: 1, to: 1, totalAlumni: 1, totalPage: 1 },
      },
    });

    act(() => {
      render(<AlumniListModule />);
    });

    await waitFor(() => {
      expect(screen.getByText(alumniData.name)).toBeInTheDocument();
      expect(screen.getByText('Menampilkan 1 - 1 dari 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(alumniData.name));

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(screen.queryByText('Alumni 1 Detail')).not.toBeInTheDocument();
    });
  });

  test('should change page correctly', async () => {
    const alumni1 = {
      id: 1,
      name: 'Alumni 1',
      email: 'alumni1@example.com',
      alumni: {
        npm: '123456',
        phoneNo: '08123456789',
        address: 'Depok',
        gender: 'MALE',
        enrollmentYear: 2020,
        graduateYear: 2024,
        studyProgram: { name: 'CS' },
      },
    };
    const alumni2 = {
      id: 2,
      name: 'Alumni 2',
      email: 'alumni2@example.com',
      alumni: {
        npm: '789012',
        phoneNo: '08987654321',
        address: 'Jakarta',
        gender: 'FEMALE',
        enrollmentYear: 2019,
        graduateYear: 2023,
        studyProgram: { name: 'CS' },
      },
    };

    mockAxios.onGet('/alumni?page=1').reply(200, {
      data: {
        users: [alumni1],
        pagination: { page: 1, from: 1, to: 1, totalAlumni: 2, totalPage: 2 },
      },
    });
    mockAxios.onGet('/alumni?page=2').reply(200, {
      data: {
        users: [alumni2],
        pagination: { page: 2, from: 2, to: 2, totalAlumni: 2, totalPage: 2 },
      },
    });

    act(() => {
      render(<AlumniListModule />);
    });

    await waitFor(() => {
      expect(screen.getByText('Menampilkan 1 - 1 dari 2')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('prev-page')); // nothing happens
    fireEvent.click(screen.getByTestId('next-page'));

    await waitFor(() => {
      expect(screen.getByText('Menampilkan 2 - 2 dari 2')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('next-page')); // nothing happens
    fireEvent.click(screen.getByTestId('prev-page'));

    await waitFor(() => {
      expect(screen.getByText('Menampilkan 1 - 1 dari 2')).toBeInTheDocument();
    });
  });
});
