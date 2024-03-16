import axiosInstance from '.';
import Router from 'next/router';
import MockAdapter from 'axios-mock-adapter';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const getItemMock = jest.fn();

const mockAxios = new MockAdapter(axiosInstance);

describe('axiosInstance', () => {
  beforeEach(() => {
    Storage.prototype.getItem = getItemMock;
    jest.clearAllMocks();
    mockAxios.reset();
  });

  afterEach(() => {
    getItemMock.mockRestore();
  });

  it('should add Authorization header for authenticated requests', async () => {
    const token = 'token';
    getItemMock.mockReturnValue(token);
    mockAxios.onGet('/api').reply(200);

    const response = await axiosInstance.get('/api');

    expect(response.config.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('should handle 401 status code by redirecting to login', async () => {
    mockAxios.onGet('/api').reply(401);

    await expect(axiosInstance.get('/api')).rejects.toThrow();

    expect(Router.push).toHaveBeenCalledWith('/login');
  });
});
