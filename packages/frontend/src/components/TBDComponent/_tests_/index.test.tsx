import { render, screen } from '@testing-library/react';
import TBDComponent from '..';

describe('TBDComponent', () => {
    it('renders the under construction messages', () => {
        render(<TBDComponent />);
        expect(
            screen.getByText(/this page is under construction/i)
        ).toBeVisible();
        expect(
            screen.getByText(/please check back later/i)
        ).toBeVisible();
    });
});