import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
  it(`should return 'Hello World!'`, async () => {
    const jsx = await Page();
    render(jsx);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World!',
    );
  });

  // it(`should show data fetched from the backend`, async () => {
  //   const jsx = await Page();
  //   render(jsx);
  //   expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
  //     'Hello User 1!',
  //   );
  // });
});
