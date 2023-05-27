import { Box } from '@mui/material';
import { MathJaxNode } from '@yozora/react-mathjax';

const Equation = props => {
    const { formula, index, ...rest } = props;
    const eq_escaped =  `${formula} \\tag${index + 1}`;
    console.log('formula=', formula, '=> eq_escaped=', eq_escaped);
    return <Box>
        <MathJaxNode inline={true} formula={eq_escaped} {...rest} />
    </Box>;
}

export default Equation;
