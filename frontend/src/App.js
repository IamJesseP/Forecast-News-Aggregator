import WeatherPage from './WeatherPage';
import Spline from '@splinetool/react-spline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#000000'
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00'
      },
      white: {
        main: '#ffffff',
        contrastText: '#ffffff'
      },
      // Provide every color token (light, main, dark, and contrastText) when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      custom: {
        light: '#ffa726',
        main: '#f57c00',
        dark: '#212121',
        contrastText: 'rgba(0, 0, 0, 0.87)'
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Spline
          scene="https://prod.spline.design/UTN7Gt-IjMLjsjHs/scene.splinecode"
          className="svg"
        />
        <WeatherPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
