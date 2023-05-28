import Equation from './Equation';
import { Box, Typography } from '@mui/material';

export const DEFAULT_PRECISION = 2;
export const MAX_PRECISION = 4;

// allows me to use single backslashes for easier reading of formulas in the code
const _r = String.raw;

const format_number = ({ n, precision, locale }) => {
    const s = new Intl.NumberFormat(locale, { maximumFractionDigits: precision }).format(n);
    // XXX prevent MathJax from inserting a space after a comma
    // http://tex.stackexchange.com/questions/303110/ddg#303127
    return s.replace(/,/g, '{,}');
}

const format = ({ n, precision, func, reverse, locale }) => {
    const result = func(n);

    return {
        value: result,
        equals: reverse(parseInt(result)) === n ? '=' : `\\approx`,
        str: format_number({ n: result, precision, locale }),
        reverse,
    }
}

const code = ({ n, precision, locale }) => {
    const n_str = format_number({ n, precision, locale });
    const sqrt = format({ n, precision, func: Math.sqrt, reverse: r => Math.pow(r, 2) })
    const sqrt3 = format({ n, precision, func: Math.cbrt, reverse: r => Math.pow(r, 3) })

    return [
        _r`\sqrt{${n_str}} ${sqrt.equals} ${sqrt.str} \to \\ ${sqrt.str}^2 = ${sqrt.str}\times${sqrt.str} ${sqrt.equals} ${n_str}`,
        _r`\sqrt[3]{${n_str}} ${sqrt3.equals} ${sqrt3.str} \to \\ ${sqrt3.str}^3 = ${sqrt3.str}\times${sqrt3.str}\times${sqrt3.str} ${sqrt3.equals} ${n_str}`,

        _r`${n_str}^2=${n_str} \times ${n_str}=${format_number({ n: sqrt.reverse(n), precision })}`,
        _r`${n_str}^3=${n_str} \times ${n_str}\times${n_str}=${format_number({ n: sqrt3.reverse(n), precision })}`,
    ];
}


const Equations = props => {
    const { n, padding, ...rest } = props;
    let { precision } = props;

    if (isNaN(n) || isNaN(precision))
        return <Typography variant="p">Enter a number</Typography>;

    if (precision < 0) {
        precision = DEFAULT_PRECISION
    }

    return (
        <Box {...rest}>
            {
                code({ n, precision }).map((eq, idx) =>
                    <Box sx={{ margin: padding, border: 'dashed 1px maroon', padding }}>
                        <Equation key={idx} index={idx} formula={eq} />
                    </Box>
                )
            }
        </Box >
    );
}

export default Equations;
