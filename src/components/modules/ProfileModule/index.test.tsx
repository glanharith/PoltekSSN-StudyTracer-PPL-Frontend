import { render, waitFor, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { axios } from '@/utils';
import { ProfileModule } from '.';
import { useToast } from '@chakra-ui/react';


jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useToast: jest.fn(),
  }));

describe('ProfileModule', () => {
    const mockOnClose = jest.fn();
    const mockAxios = new MockAdapter(axios);


  beforeEach(() => {
    mockAxios.reset();
    mockOnClose.mockClear();
    (useToast as jest.Mock).mockClear();
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    mockAxios.restore(); // Mengembalikan axios ke keadaan semula setelah setiap pengujian
  });

  test('renders profile information correctly', async () => {
    // Mock user data
    const mockUserData = {
      name: 'John Doe',
      alumni: {
        phoneNo: '1234567890',
        address: '123 Main St',
        enrollmentYear: 2020,
      },
    };

    // Mock axios response
    mockAxios.onGet('/profile').reply(200, { data: mockUserData });

    render(<ProfileModule />);

    // Wait for profile information to be rendered
    await waitFor(() => {
      expect(screen.getByLabelText('Nama Lengkap')).toHaveValue(mockUserData.name);
      expect(screen.getByLabelText('No. Telepon')).toHaveValue(parseInt(mockUserData.alumni.phoneNo));
      expect(screen.getByLabelText('Alamat')).toHaveValue(mockUserData.alumni.address);
      expect(screen.getByLabelText('Tahun Masuk')).toHaveValue(mockUserData.alumni.enrollmentYear.toString());
    });
  });
});
