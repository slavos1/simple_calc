import { Box, Typography } from "@mui/material";
import pf from "quick-primefactors";
import * as _ from "lodash";
import { MathJaxNode } from "@yozora/react-mathjax";
import PropTypes from "prop-types";
import { MAX_NUMBER } from "./config";
import { gcd, lcm } from "mathjs";

const PrimeFactors = ({ n, n2, ...rest }) => {
  const prime_factors = n >= MAX_NUMBER ? [] : pf(n);
  const pf_grouped = _.groupBy(prime_factors);
  console.log("pf_grouped=", pf_grouped);
  const formula = `\\,(${n}=${_.map(
    pf_grouped,
    (value, key) => `${key}${value.length > 1 ? `^${value.length}` : ""}`
  ).join("\\times")})`;
  console.log("formula=", formula);
  const grouped = <MathJaxNode inline={true} formula={formula} />;
  // XXX _.keys returns any keys as strings, not integers as assumed ...
  const factors = _.keys(pf_grouped).map((key) => parseInt(key));

  let contents;
  if (n === 1) {
    contents = (
      <Typography variant="p">
        1 is neither a prime nor a composite number.
      </Typography>
    );
  } else {
    contents = (
      <Box>
        <Typography variant="p">
          Prime {factors.length > 1 ? "factors" : "factor"} of {n}{" "}
          {factors.length > 1 ? "are" : "is"} {_.sortBy(factors).join(", ")}{" "}
          &mdash;{" "}
        </Typography>
        <Typography variant="p">
          {n} is a{" "}
          <strong>{prime_factors.length > 1 ? "composite" : "prime"}</strong>{" "}
          number
          {prime_factors.length > 1 && grouped}.
        </Typography>
        GCD({n},{n2})(aka HCF)={n2 !== undefined && !isNaN(n2) && gcd(n, n2)}
        LCM({n},{n2})={n2 !== undefined && !isNaN(n2) && lcm(n, n2)}
      </Box>
    );
  }

  return <Box {...rest}>{contents}</Box>;
};

PrimeFactors.propTypes = {
  n: PropTypes.number,
  rest: PropTypes.any,
};

export default PrimeFactors;
