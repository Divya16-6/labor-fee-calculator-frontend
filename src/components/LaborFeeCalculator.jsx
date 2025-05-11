import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { calculateLaborFee } from "../service/calculatorApi";

export default function LaborFeeCalculator() {
  const [startDate,


    setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [perHourCharge, setPerHourCharge] = useState("");
  const [overTimeCharge, setoverTimeCharge] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateDates = (endDate) => {
    if (!endDate || !startDate) return;
    
    if (endDate < startDate) {
      alert('End date cannot be earlier than start date');
      setEndDate(null);
    }
  };

  const handleCalculate = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    const dateError = validateDates();
    if (dateError) {
      setError(dateError);
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const data = await calculateLaborFee({ startDate, endDate, perHourCharge, overTimeCharge });
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while calculating.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <Container
      sx={{
        width: 300,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 1,
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Labor Fee Calculator
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newDate) => {
              newDate.setHours(12);
              setStartDate(newDate); // Set the new start date
              validateDates(newDate);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newDate) => {
              setEndDate(new Date(newDate.setHours(12)))
              setEndDate(newDate);
              validateDates(newDate); // Validate end date after it's updated
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Box mt={1}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Per Hour Charge (optional)"
            type="number"
            value={perHourCharge}
            onChange={(e) => setPerHourCharge(e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            label="Overtime Hour Charge (optional)"
            type="number"
            value={overTimeCharge}
            onChange={(e) => setoverTimeCharge(e.target.value)}
          />
        </Stack>
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          fullWidth
          size="small"
          onClick={handleCalculate}
          disabled={(!startDate || !endDate) || loading}
        >
          {loading ? "Calculating..." : "Calculate Fee"}
        </Button>
      </Box>

      {result && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Result
          </Typography>
          <Typography>
            Start Date: {new Date(result.startDate).toLocaleDateString()}
          </Typography>
          <Typography>
            End Date: {new Date(result.endDate).toLocaleDateString()}
          </Typography>
          <Typography>
            Per Hour Charge: {result.perHourCharge}
          </Typography>
          <Typography>
            Over Time Charge: {result.overTimeCharge}
          </Typography>
          <Typography fontSize="14px">
            Total hours Worked: {result.totalNormalHours} hrs
          </Typography>
          <Typography fontSize="14px">
            Overtime hours Worked: {result.totalOvertimeHours} hrs
          </Typography>
          <Typography fontWeight="bold" fontSize="15px">
            Total Pay: ${result.totalPay}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
