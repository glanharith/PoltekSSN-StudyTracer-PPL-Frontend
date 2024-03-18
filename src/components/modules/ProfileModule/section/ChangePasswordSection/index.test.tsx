import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { axios } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { ChangePassword } from '.';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));
const mockAxios = new MockAdapter(axios);
const alumniUser = {
    name: 'user',
    password: 'password',
    alumni: {
      phoneNo: '0818288888888',
      address: 'depok',
      enrollmentYear: 2020,
    },
  };
beforeEach(() => {
    mockAxios.reset();
  
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  
    mockAxios.onGet('/profile').reply(200, { data: alumniUser });
  });

describe('ChangePassword', () => {
 
  test('displays warning when current password is not entered', async () => {
    render(<ChangePassword />);
    const saveButton = screen.getByText('Simpan');
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(screen.getByText('Masukkan Password Lama Anda')).toBeInTheDocument();
    });
  }); 

  test('displays error toast when new password is not entered', async () => {
    render(<ChangePassword />);
    const oldPasswordInput = screen.getByLabelText('Password Lama');
    fireEvent.change(oldPasswordInput, { target: { value: 'oldpassword' } });
    const saveButton = screen.getByText('Simpan');
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(screen.getByText('Masukkan password baru Anda')).toBeInTheDocument();
    });
  }); 
  test('displays error toast when confirm password does not match new password', async () => {
    mockAxios.onPatch('/profile').reply(200)
    render(<ChangePassword />);

    fireEvent.input(screen.getByLabelText('Password Lama'), {
      target: { value: 'invalidPassword' },
    });
    fireEvent.input(screen.getByLabelText('Password Baru'), {
      target: { value: 'Password' },
    });
    fireEvent.input(screen.getByLabelText('Konfirmasi Password Baru'), {
      target: { value: 'newPassword' },
    });

    fireEvent.click(screen.getByText('Simpan'));

    await waitFor(() => {
        expect(screen.getByText('Masukkan password yang sama')).toBeInTheDocument();
      });
  });

  test('displays error when input current password is invalid', async () => {
    mockAxios.onPatch('/profile').reply(200)
    await render(<ChangePassword />);


    await act( async () => {
      fireEvent.input(screen.getByLabelText('Password Lama'), {
        target: { value: 'password' },
      });
      fireEvent.input(screen.getByLabelText('Password Baru'), {
        target: { value: 'Juggernaut123*' },
      });
      fireEvent.input(screen.getByLabelText('Konfirmasi Password Baru'), {
        target: { value: 'Juggernaut123*' },
      });
  
      await new Promise((r) => setTimeout(r, 2000));
    })


    act(() => {
      fireEvent.click(screen.getByText('Simpan'));
    })

    await waitFor(() => {
      expect(useToast()).toHaveBeenCalledWith({
        title: 'Profil berhasil diperbarui!',
        status: 'success',
      });
    });
  });

  it('display error when the new password is not strong enough', async () => {
    mockAxios.onPatch('/profile').reply(200)
    await render(<ChangePassword />);


    await act( async () => {
      fireEvent.input(screen.getByLabelText('Password Lama'), {
        target: { value: 'password' },
      });
      fireEvent.input(screen.getByLabelText('Password Baru'), {
        target: { value: 'nanananananana' },
      });
      fireEvent.input(screen.getByLabelText('Konfirmasi Password Baru'), {
        target: { value: 'nanananananana' },
      });
  
      await new Promise((r) => setTimeout(r, 2000));
    })

    act(() => {
      fireEvent.click(screen.getByText('Simpan'));
    })
    
    await waitFor( async () => {
      expect(screen.getByText("Harap gunakan password yang lebih kuat")).toBeInTheDocument()
    })
  })

  it('displays error when current password is invalid', async () => {
    await act(() => {
        render(<ChangePassword />);
      });
    
    await act( async () => {
      fireEvent.input(screen.getByLabelText('Password Lama'), {
        target: { value: 'password' },
      });
      fireEvent.input(screen.getByLabelText('Password Baru'), {
        target: { value: 'Juggernaut123*' },
      });
      fireEvent.input(screen.getByLabelText('Konfirmasi Password Baru'), {
        target: { value: 'Juggernaut123*' },
      });
  
      await new Promise((r) => setTimeout(r, 2000));
    })

    act(() => {
      fireEvent.click(screen.getByText('Simpan'));
    })

    await waitFor(() => {
        expect(useToast()).toHaveBeenCalledWith({
            title: "Profil gagal diperbarui, password lama salah!",   
            status: 'error',
        });
      });
  })

  
});
