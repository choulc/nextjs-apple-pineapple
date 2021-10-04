import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            light: '#76d275',
            main: '#43a047',
            dark: '#00701a',
            contrastText: '#f1f8e9',
        },
        secondary: {
            light: '#ffd95b',
            main: '#ffa726',
            dark: '#c77800',
            contrastText: '#ffebee',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;