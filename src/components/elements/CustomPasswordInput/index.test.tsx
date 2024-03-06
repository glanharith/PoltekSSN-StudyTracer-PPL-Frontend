import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CustomPasswordInput } from '.';
import { FormInputProps } from './interface';
import { zxcvbnAsync } from '@zxcvbn-ts/core';

jest.mock('@zxcvbn-ts/core');

describe('CustomPasswordInput', () => {
  it('should render password input correctly', async () => {
    const props: FormInputProps = {
      label: 'Password',
      placeholder: 'Password',
      register: {
        name: 'password',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        ref: jest.fn(),
      },
      withValidation: true,
      password: 'password1234',
    };
    (zxcvbnAsync as jest.Mock).mockResolvedValue({ score: 3 });

    render(<CustomPasswordInput {...props} />);

    await waitFor(
      () => {
        expect(zxcvbnAsync).toHaveBeenCalledWith('password1234');
      },
      { timeout: 3000 },
    );

    expect(screen.getByPlaceholderText(props.placeholder!)).toBeInTheDocument();
    expect(screen.getByLabelText(props.label!)).toBeInTheDocument();
  });

  it('should toggle password visibility', async () => {
    const props: FormInputProps = {
      label: 'Password',
      placeholder: 'Password',
      register: {
        name: 'password',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        ref: jest.fn(),
      },
      withValidation: true,
      password: 'password1234',
      scoreCallback: jest.fn(),
    };
    (zxcvbnAsync as jest.Mock).mockResolvedValue({ score: 3 });

    render(<CustomPasswordInput {...props} />);

    const eyeOffIcon = screen.getByTestId('eye-off-icon');
    fireEvent.click(eyeOffIcon);

    await waitFor(() => {
      expect((screen.getByLabelText('Password') as HTMLInputElement).type).toBe(
        'text',
      );
    });

    const eyeIcon = screen.getByTestId('eye-icon');
    fireEvent.click(eyeIcon);

    await waitFor(() => {
      expect((screen.getByLabelText('Password') as HTMLInputElement).type).toBe(
        'password',
      );
    });
  });
});
