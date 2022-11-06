import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import Header from "../components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
    overrides: {
      MuiAppBar: {
        root: {},
      },
    },
    props: {
      MuiIconButton: {
        disableRipple: true, //Not working I put on each button thats work
      },
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex"
    // width: "100%",
    // flexGrow: 1,
  },
}))
function App() {
  const classes = useStyles();
  return( 
  <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Header/>
    </div>

  </ThemeProvider>
  );
}

export default App;
