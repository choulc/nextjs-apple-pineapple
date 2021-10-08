import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from '@emotion/styled'
import theme from '../theme'

const StyledTitle = styled.div`
    text-align: center;
    color: ${theme.palette.secondary.dark};
`

const ProductTitle = (props) => {

    const { title } = props

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem',
                    fontWeight: 700,
                    paddingTop: {
                        xs: 5, md: 0
                    }
                }}>
                    <StyledTitle>
                        {title}
                    </StyledTitle>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default ProductTitle;