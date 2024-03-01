import { parseUser } from '.';
import { jwtVerify } from 'jose';

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
}));

const getItemMock = jest.fn();

describe('parseUser', () => {
  beforeEach(() => {
    Storage.prototype.getItem = getItemMock;
  });

  afterEach(() => {
    getItemMock.mockRestore();
  });

  it('should return null if token is not present in localStorage', async () => {
    const result = await parseUser();
    expect(result).toBeNull();
  });

  it('should throw error if env is not set', async () => {
    getItemMock.mockReturnValue('token');

    delete process.env.NEXT_PUBLIC_JWT_SECRET;

    await expect(parseUser()).rejects.toThrow(Error);
  });

  it('should return parsed user data', async () => {
    const token = 'token';
    const secret = 'secret';
    const encodedSecret = new TextEncoder().encode(secret);

    getItemMock.mockReturnValue(token);

    process.env.NEXT_PUBLIC_JWT_SECRET = secret;

    (jwtVerify as jest.Mock).mockResolvedValue({
      payload: {
        sub: 'id',
        name: 'name',
        role: 'ADMIN',
      },
    });

    const result = await parseUser();

    expect(jwtVerify).toHaveBeenCalledWith(token, encodedSecret);
    expect(result).toEqual({
      sub: 'id',
      id: 'id',
      name: 'name',
      role: 'ADMIN',
    });
  });

  it('should return null if jwtVerify throws an error', async () => {
    const token = 'token';
    const secret = 'secret';

    getItemMock.mockReturnValue(token);

    process.env.NEXT_PUBLIC_JWT_SECRET = secret;

    (jwtVerify as jest.Mock).mockRejectedValue(new Error());

    const result = await parseUser();

    expect(result).toBeNull();
  });
});
