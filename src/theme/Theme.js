import { createMuiTheme } from '@material-ui/core/styles';


// A theme with custom primary and secondary color.
// It's optional.
const Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#55677b',
      main: '#2a3d4f',
      dark: '#011727',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff9e40',
      main: '#ff6d00',
      dark: '#c43c00',
      contrastText: '#212121',
    },
  },

 
});

export default Theme;
