import React from 'react';
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    gridContainer: {
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const ProductLink = (props) => {

    const { linkList } = props
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <h2 className={classes.title}>
                    相關連結
                </h2>
                <Grid container className={classes.gridContainer}>
                    {linkList.map(link => (
                        <Grid item xs={6} md={4} lg={2} key={link.id}>
                            <div className={classes.cardContainer}>
                                <div className={classes.card}>
                                    <div className={classes.image}>
                                        <img src={link.image} alt="" />
                                    </div>
                                    <div className={classes.title}>
                                        <span>{link.name}</span>
                                    </div>
                                    <div className={classes.description}>
                                        <span>{link.description}</span>
                                    </div>
                                    <div className={classes.button}>
                                        <Button variant="outlined">{link.buttonText}</Button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ProductLink;