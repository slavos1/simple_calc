import { MathJaxProvider } from '@yozora/react-mathjax';
import Equation from './Equation';
import { Box, Typography } from '@mui/material';
import { printf } from 'fast-printf';

export const DEFAULT_PRECISION = 2;
export const MAX_PRECISION = 4;

// allows me to use single backslashes for easier reading of formulas in the code
const _r = String.raw;

const is_integer = n => {
    return parseInt(n) === n;
}

const format = (n, is_exact, fmt) => (is_exact ? n : printf(fmt, n));

const code = (n, precision) => {
    const fmt = `%.${precision}f`;
    const fmt_with_max_precision = `%.${MAX_PRECISION}f`;
    console.log('fmt=', fmt);

    const sqrt = Math.sqrt(n);
    const sqrt_with_precision = parseFloat(printf(fmt_with_max_precision, sqrt));
    const sqrt_is_exact = Math.pow(sqrt_with_precision, 2) === n;
    const sqrt_equals = sqrt_is_exact ? '=' : _r`\approx`;
    const sqrt_fmt = format(sqrt, sqrt_is_exact, fmt);

    const sqrt3 = Math.pow(n, 1 / 3);
    const sqrt3_with_precision = parseFloat(printf(fmt_with_max_precision, sqrt3));
    const sqrt3_is_exact = Math.pow(sqrt3_with_precision, 3) === n;
    const sqrt3_equals = sqrt3_is_exact ? '=' : _r`\approx`;
    const sqrt3_fmt = format(sqrt3, sqrt3_is_exact, fmt);

    return [
        _r`\sqrt{${n}} ${sqrt_equals} ${sqrt_fmt} \to \\ ${sqrt_fmt}^2 = ${sqrt_fmt}\times${sqrt_fmt} ${sqrt_equals} ${n}`,
        _r`\sqrt[3]{${n}} ${sqrt3_equals} ${sqrt3_fmt} \to \\ ${sqrt3_fmt}^3=${sqrt3_fmt}\times${sqrt3_fmt}\times${sqrt3_fmt} ${sqrt3_equals} ${n}`,

        _r`${n}^2=${n} \times ${n}=${Math.pow(n, 2)}`,
        _r`${n}^3=${n} \times ${n}\times${n}=${Math.pow(n, 3)}`,

        //         `\sqrt[3]{${n}}=${sqrt3}\rightarrow
        //   \\${sqrt3}^3=${sqrt3}\times${sqrt3}\times${sqrt3}=${n}`
    ];
}


const Equations = props => {
    const { n, precision, ...rest } = props;
    if (isNaN(n) || isNaN(precision))
        return <Typography variant="p">Enter a number</Typography>;

    return (
        <Box {...rest}>

            {
                code(n, precision < 0 ? DEFAULT_PRECISION : precision).map((eq, idx) =>
                    <Box sx={{ margin: '1rem', border: 'dashed 1px maroon', padding: '1rem' }}>
                        <MathJaxProvider>
                            <Equation key={idx} index={idx} formula={eq} />
                        </MathJaxProvider>
                    </Box>
                )
            }
            {/* </MathJaxProvider> */}
        </Box >
    );
}

export default Equations;
