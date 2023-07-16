import { Card, CardContent, CardHeader } from "@mui/material";
import PropTypes from "prop-types";
import { MathJaxNode } from "@yozora/react-mathjax";
import Grid from "./Grid";

const Equation = ({ formula, title, subtitle, sx }) => {
  // const eq_escaped = `${formula} \\tag${index + 1}`;
  // console.log("formula=", formula, "=> eq_escaped=", eq_escaped);
  console.log("formula=", formula);
  return (
    <Grid xs={12} md={6} lg={4}>
      <Card sx={sx}>
        <CardHeader title={title} subheader={subtitle}></CardHeader>
        <CardContent>
          <MathJaxNode inline={true} formula={formula} />
          {/* <Typography variant="p">
          80.14<sup>2</sup> = 80.14 &times; 80.14 &#x2248; 6,423
          </Typography> */}
        </CardContent>
      </Card>
    </Grid>
  );
};

Equation.propTypes = {
  formula: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  sx: PropTypes.object,
};

export default Equation;
