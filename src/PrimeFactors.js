import { Box, Typography } from '@mui/material';
import pf from 'quick-primefactors';

const MAX_ALLOWED = 9999 + 1;

const PrimeFactors = props => {
    const { n, ...rest } = props;
    const prime_factors = n >= MAX_ALLOWED ? [] : pf(n);

    let contents;
    if (n === 1) {
        contents = <Typography variant="p">1 is neither a prime nor a composite number.</ Typography>;
    } else {
        contents = <div>
            <Typography variant="p">
                Prime {prime_factors.length > 1 ? 'factors' : 'factor'}
                {' '}of {n}
                {' '}{prime_factors.length > 1 ? 'are' : 'is'}
                {' '}{prime_factors.join(', ')} &mdash; </ Typography>

            <Typography variant="p">{n} is a <strong>{prime_factors.length > 1 ? 'composite' : 'prime'}</strong> number.</ Typography>
        </div>
    }

    return <Box {...rest}>{contents}</Box>
}

export default PrimeFactors;
