import { render, screen, fireEvent } from '@testing-library/react';
import Error from '../index';

describe('Error component', () => {
    it('renders default error message and title', () => {
        render(<Error />);
        expect(screen.getByText(/error/i)).toBeInTheDocument();
        expect(screen.getByText(/something went wrong, please retry/i)).toBeInTheDocument();
    });

    it('renders custom error message', () => {
        render(<Error errorMessage="Custom error!" />);
        expect(screen.getByText(/custom error!/i)).toBeInTheDocument();
    });

    it('renders retry button and calls retryAction on click', () => {
        const retryMock = jest.fn();
        render(<Error retryAction={retryMock} reTryText="Try Again" />);
        const button = screen.getByRole('button', { name: /try again/i });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(retryMock).toHaveBeenCalledTimes(1);
    });

    it('does not render retry button if retryAction is not provided', () => {
        render(<Error />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});