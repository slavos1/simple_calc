import Equations from "./Equations";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PrimeFactors from "./PrimeFactors";
import PropTypes from "prop-types";
import Grid from "./Grid";
import { MAX_NUMBER, MAX_PRECISION, DEFAULT_PRECISION } from "./config";
import { useState } from "./useState";

const App = ({ padding = ".5rem" }) => {
  const [number, setNumber] = useState("number", 911112);
  const [number2, setNumber2] = useState("number2", 81);
  const [precision, setPrecision] = useState("precision", DEFAULT_PRECISION);
  const [fontSize, setFontSize] = useState("fontSize", 20);
  const fontSizePt = `${fontSize}pt`;
  const n = parseInt(number);
  const n2 = parseInt(number2);
  let precision_int = parseInt(precision);
  if (isNaN(precision_int)) {
    precision_int = DEFAULT_PRECISION;
  }

  const rendered =
    isNaN(n) || n >= MAX_NUMBER ? (
      <Typography>
        Please enter a number which smaller than {MAX_NUMBER}.
      </Typography>
    ) : (
      <Box sx={{ border: "solid 0px green", p: 1 }}>
        {/* TODO split equations and prime factors to two columns */}
        <Equations
          n={n}
          precision={precision_int}
          sx={{ fontSize: fontSizePt }}
          padding={padding}
        />
        <PrimeFactors n={n} n2={n2} sx={{ fontSize: fontSizePt, padding }} />
      </Box>
    );

  return (
    <div className="App">
      <h1>Simple calculator</h1>

      <Grid container spacing={1}>
        {/* form */}
        <Grid md={2}>
          <Box sx={{ border: "solid 0px red" }}>
            <Grid container spacing={1}>
              {/* number */}
              <Grid>
                <TextField
                  required
                  id="outlined-required"
                  label="Number 1"
                  type="number"
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                  size="standard"
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  id="outlined-required"
                  label="Number 2"
                  type="number"
                  value={number2}
                  onChange={(event) => setNumber2(event.target.value)}
                  size="standard"
                />
              </Grid>

              {/* precision */}
              <Grid lg={7} md={5} xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Precision
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={precision}
                    label="Precision"
                    onChange={(event) => setPrecision(event.target.value)}
                  >
                    {[...Array(MAX_PRECISION).keys()].map((value, idx) => (
                      <MenuItem key={idx} value={value + 1}>
                        {value + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* font size */}
              <Grid lg={7} md={5} xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Font size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={fontSize}
                    label="Font size"
                    onChange={(event) => setFontSize(event.target.value)}
                  >
                    {[10, 20, 30, 40, 50].map((value, idx) => (
                      <MenuItem key={idx} value={`${value}pt`}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* equations */}
        <Grid md={10}>{rendered}</Grid>
      </Grid>
    </div>
  );
};

App.propTypes = {
  padding: PropTypes.string,
};

export default App;
