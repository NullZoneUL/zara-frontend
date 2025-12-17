import PhoneSpecs from '.';
import { render, screen } from '@testing-library/react';

const mockSpecs = {
  screen: '6.8" Dynamic AMOLED',
  resolution: '3120 x 1440 pixels',
  processor: 'Snapdragon 8 Gen 3',
  mainCamera: '200 MP',
  selfieCamera: '12 MP',
  battery: '5000 mAh',
  os: 'Android 14',
  screenRefreshRate: '120 Hz',
};

describe('PhoneSpecs component', () => {
  it('renders provided specifications', () => {
    render(
      <PhoneSpecs
        specs={mockSpecs}
        brand="Samsung"
        name="Galaxy S24"
        description="Samsung description test"
      />,
    );

    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('6.8" Dynamic AMOLED')).toBeInTheDocument();
    expect(screen.getByText('Snapdragon 8 Gen 3')).toBeInTheDocument();
  });

  it('uses semantic definition list structure', () => {
    render(
      <PhoneSpecs
        specs={mockSpecs}
        brand="Samsung"
        name="Galaxy S24"
        description="Samsung description test"
      />,
    );

    const terms = screen.getAllByRole('term');
    const definitions = screen.getAllByRole('definition');

    expect(terms.length).toBe(definitions.length);
    expect(terms.length).toBeGreaterThan(0);
  });
});
