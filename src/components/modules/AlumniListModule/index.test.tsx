import MockAdapter from "axios-mock-adapter";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
      { id: 1, name: 'Alumni 1', email: 'alumni1@example.com', alumni: { npm: '123456', phoneNo: '08123456789', address: 'Depok', gender: 'MALE', enrollmentYear: 2020, graduateYear: 2024, studyProgramId: 'IT' } },
      { id: 2, name: 'Alumni 2', email: 'alumni2@example.com', alumni: { npm: '789012', phoneNo: '08987654321', address: 'Jakarta', gender: 'FEMALE', enrollmentYear: 2019, graduateYear: 2023, studyProgramId: 'CS' } },
    ];
  
    mockAxios.onGet('/alumni').reply(200, { data: alumniData });
  
    render(<AlumniListModule />);
  
    await waitFor(() => {
      expect(screen.getByText('Daftar Alumni')).toBeInTheDocument();
    });
  
   
  });
  
  test('opens modal with alumni detail when alumni clicked', async () => {
    const alumniData = { id: 1, name: 'Alumni 1', email: 'alumni1@example.com', alumni: { npm: '123456', phoneNo: '08123456789', address: 'Depok', gender: 'MALE', enrollmentYear: 2020, graduateYear: 2024, studyProgram: {name:'IT'}} };
  
    mockAxios.onGet('/alumni').reply(200, { data: [alumniData] });
  
    render(<AlumniListModule />);
  
    await waitFor(() => {
      expect(screen.getByText('Daftar Alumni')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText(alumniData.name));
  
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  
    await waitFor(() => {
      expect(screen.queryByText('Alumni 1 Detail')).not.toBeInTheDocument();
    });
  });
  
});
