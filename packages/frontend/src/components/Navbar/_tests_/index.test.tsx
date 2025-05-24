import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
    let useMediaQueryMock: jest.SpyInstance;
    afterEach(() => {
        if (useMediaQueryMock) useMediaQueryMock.mockRestore();
    });

    describe('Navbar Desktop', () => {
        it('renders Navbar Desktop correctly', () => {
            useMediaQueryMock = jest.spyOn(require('@mui/material/useMediaQuery'), 'default').mockReturnValue(false);

            const { asFragment } = render(<Navbar />);

            expect(screen.getByTestId('desktop-navbar')).toBeInTheDocument();
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe('Mobile responsive', () => {
        it('renders MobileNavbar Mobile correctly', () => {
            useMediaQueryMock = jest.spyOn(require('@mui/material/useMediaQuery'), 'default').mockReturnValue(true);

            const { asFragment } = render(<Navbar />);

            expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument();
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
