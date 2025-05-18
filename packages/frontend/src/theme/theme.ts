import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#DA458F",
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#dc004e',
            light: '#ff4081',
            dark: '#9a0036',
        },
        background: {
            default: '#ffffff',
            paper: '#17161AB2',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#89888B',
        },
    },
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});