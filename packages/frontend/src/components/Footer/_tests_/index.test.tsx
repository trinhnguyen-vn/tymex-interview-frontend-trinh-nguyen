import { render } from '@testing-library/react';
import Footer from '..';

it('renders Footer correctly', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
});