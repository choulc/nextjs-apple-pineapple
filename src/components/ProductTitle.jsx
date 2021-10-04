import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.secondary.dark
    }
}))

const ProductTitle = (props) => {

    const { title } = props
    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{
                    height: '10vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem',
                    fontWeight: 700,
                }}>
                    <div className={classes.title}>
                        {title}
                    </div>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default ProductTitle;