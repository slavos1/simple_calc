import { Box, Typography } from '@mui/material';
import pf from 'quick-primefactors';
import * as _ from 'lodash';
import { MathJaxNode } from '@yozora/react-mathjax';

const MAX_ALLOWED = 9999 + 1;

const PrimeFactors = props => {
    const { n, ...rest } = props;
    const prime_factors = n >= MAX_ALLOWED ? [] : pf(n);
    const pf_grouped = _.groupBy(prime_factors);
    console.log('pf_grouped=', pf_grouped);
    const formula = `\\,(${n}=${_.map(pf_grouped, (value, key) => `${key}${value.length > 1 ? `^${value.length}` : ''}`).join('\\times')})`;
    const grouped = <MathJaxNode inline={true} formula={formula} />
    // XXX _.keys returns any keys as strings, not integers as assumed ...
    const factors = _.keys(pf_grouped).map(key => parseInt(key));

    let contents;
    if (n === 1) {
        contents = <Typography variant="p">1 is neither a prime nor a composite number.</ Typography>;
    } else {
        contents = <div>
            <Typography variant="p">
                Prime {factors.length > 1 ? 'factors' : 'factor'}
                {' '}of {n}
                {' '}{factors.length > 1 ? 'are' : 'is'}
                {' '}{_.sortBy(factors).join(', ')} &mdash; </ Typography>

            <Typography variant="p">{n} is a <strong>{prime_factors.length > 1 ? 'composite' : 'prime'}</strong> number
                {prime_factors.length > 1 && grouped}
                .</ Typography>

        </div >
    }

    return <Box {...rest}>{contents}</Box>
}

export default PrimeFactors;
