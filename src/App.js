import { useState } from 'react';
import pf from 'quick-primefactors';
import Equations, { DEFAULT_PRECISION, MAX_PRECISION } from './Equations';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const MAX_NUMBER = 9999 + 1;

function App() {
  const [number, setNumber] = useState(27);
  const [precision, setPrecision] = useState(DEFAULT_PRECISION);
  const [fontSize, setFontSize] = useState("40pt");
  const n = parseInt(number);
  const precision_int = parseInt(precision);
  // const prime_factors = n < 1000000 ? pf(n) : [];

  const rendered = n >= MAX_NUMBER ? <Typography>Please enter number smaller than {MAX_NUMBER}.</Typography> :
    <Box sx={{ border: 'solid 0px green' }}>
      {/* prime_factors={prime_factors.join(', ')} */}
      < Equations n={n} precision={precision_int} sx={{ fontSize }} />
    </Box>;

  return (
    <div className="App">
      <h1>Simple calculator</h1>

      <Grid container spacing={2}>
        {/* form */}
        <Grid item md={2}>
          <Box sx={{ border: 'solid 0px red' }}>
            <Grid container spacing={1}>

              {/* number */}
              <Grid item lg={5} md={7} xs={8}>
                <TextField
                  required
                  id="outlined-required"
                  label="Number"
                  type="number"
                  defaultValue="1"
                  value={number}
                  onChange={event => setNumber(event.target.value)}
                  size="standard"
                />
              </Grid>

              {/* precision */}
              <Grid item lg={7} md={5} xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Precision</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={precision}
                    label="Precision"
                    onChange={event => setPrecision(event.target.value)}
                  >
                    {
                      [...Array(MAX_PRECISION).keys()].map((value, idx) => <MenuItem key={idx} value={value + 1}>{value + 1}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>

              {/* font size */}
              <Grid item lg={7} md={5} xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Font size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={fontSize}
                    label="Font size"
                    onChange={event => setFontSize(event.target.value)}
                  >
                    {
                      [20, 30, 40, 50].map((value, idx) => <MenuItem key={idx} value={`${value}pt`}>{value}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
          </Box>
        </Grid>

        {/* equations */}
        <Grid item md={10}>
          {rendered}
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
