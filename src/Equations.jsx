import Equation from "./Equation";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Grid from "./Grid";
import {
  APPROX_CHAR,
  DEFAULT_PRECISION,
  SQRT3_CHAR,
  SQRT_CHAR,
} from "./config";
import * as _ from "lodash";

// allows me to use single backslashes for easier reading of formulas in the code
const _r = String.raw;

const format_number = ({ n, precision, locale }) => {
  const s = new Intl.NumberFormat(locale, {
    maximumFractionDigits: precision,
  }).format(n);
  // XXX prevent MathJax from inserting a space after a comma
  // http://tex.stackexchange.com/questions/303110/ddg#303127
  // return s.replace(/,/g, "{,}");
  return s;
};

const format = ({ n, precision, func, reverse, locale }) => {
  const result = func(n);

  return {
    value: result,
    equals: reverse(parseInt(result)) === n ? "=" : APPROX_CHAR,
    str: format_number({ n: result, precision, locale }),
    reverse,
  };
};

const code = ({ n, precision, locale }) => {
  const n_str = format_number({ n, precision, locale });
  const sqrt = format({
    n,
    precision,
    func: Math.sqrt,
    reverse: (r) => Math.pow(r, 2),
  });
  const sqrt3 = format({
    n,
    precision,
    func: Math.cbrt,
    reverse: (r) => Math.pow(r, 3),
  });

  return [
    {
      title: "Square root",
      subtitle: `Square root of ${n}`,
      result: sqrt.str,
      // formula: _r`\sqrt{${n_str}} ${sqrt.equals} ${sqrt.str}\\~\\${sqrt.str}^2\\= ${sqrt.str}\times${sqrt.str}\\${sqrt.equals} ${n_str}`,
      // formula: `${SQRT_CHAR}${sqrt.str}`,
      formula: (
        <Box>
          <Box
            component="span"
            dangerouslySetInnerHTML={{ __html: SQRT_CHAR }}
          ></Box>
          <Box component="span" sx={{ borderTop: "solid 1px" }}>
            {sqrt.str}
          </Box>
        </Box>
      ),
    },

    {
      title: "Cube root",
      subtitle: `Cube root of ${n}`,
      result: sqrt3.str,
      // formula: _r`\sqrt[3]{${n_str}} ${sqrt3.equals} ${sqrt3.str}\\~\\${sqrt3.str}^3\\= ${sqrt3.str}\times${sqrt3.str}\times${sqrt3.str}\\${sqrt3.equals} ${n_str}`,
      formula: (
        <Box>
          <Typography paragraph>
            <Box
              component="span"
              dangerouslySetInnerHTML={{ __html: SQRT3_CHAR }}
            ></Box>
            <Box component="span" sx={{ borderTop: "solid 1px" }}>
              {n_str}
            </Box>{" "}
            ={" "}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {sqrt3.str}
            </Box>
          </Typography>
          <Typography
            paragraph
            dangerouslySetInnerHTML={{
              __html: `${_.fill(Array(3), sqrt3.str).join(
                " &times; "
              )} = ${n_str}`,
            }}
          />
          {/* {sqrt3.str} &times; {sqrt3.str} &times; {sqrt3.str} = {n_str} */}
          {/* </Typography> */}
        </Box>
      ),
    },

    {
      title: "Squared",
      subtitle: `${n} to the power 2 or ${n} squared`,
      result: `${sqrt.reverse(n)}`,
      formula: _r`${n_str}^2\\=${n_str} \times ${n_str}\\=${format_number({
        n: sqrt.reverse(n),
        precision,
      })}`,
    },

    {
      title: "Cubed",
      subtitle: `${n} to the power 3 or ${n} cubed`,
      result: `${sqrt3.reverse(n)}`,
      formula: _r`${n_str}^3\\=${n_str} \times ${n_str}\times${n_str}\\=${format_number(
        {
          n: sqrt3.reverse(n),
          precision,
        }
      )}`,
    },
  ];
};

const Equations = ({ n, precision, sx }) => {
  if (isNaN(n) || isNaN(precision))
    return <Typography variant="p">Enter a number</Typography>;

  return (
    <Grid container spacing={1}>
      {/* <Box {...rest} sx={{border:'solid 1px red'}}> */}
      {code({
        n,
        precision: precision < 0 ? DEFAULT_PRECISION : precision,
      }).map((eq, idx) => (
        // <Box
        //   key={idx}
        //   sx={{ margin: padding, border: "dashed 1px maroon", padding }}
        // >
        <Equation
          key={idx}
          sx={{
            ...sx,
            p: 0,
            boxShadow: 0,
            border: "solid 1px",
            borderRadius: "4px",
          }}
          {...eq}
          precision={precision}
        />
        // </Box>
      ))}
      {/* </Box> */}
    </Grid>
  );
};

Equations.propTypes = {
  n: PropTypes.number,
  padding: PropTypes.string,
  precision: PropTypes.number,
  rest: PropTypes.any,
  sx: PropTypes.object,
};

export default Equations;
