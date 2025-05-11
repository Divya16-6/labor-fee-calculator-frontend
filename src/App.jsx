import React from "react";
import LaborFeeCalculator from "./components/LaborFeeCalculator";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LaborFeeCalculator />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;

