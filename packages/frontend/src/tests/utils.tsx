import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/theme';

export const renderWithTheme = (ui: React.ReactNode, options?: RenderOptions) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>, options);
}

