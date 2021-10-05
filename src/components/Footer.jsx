import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 80,
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        [theme.breakpoints.up('sm')]: {
            fontSize: 14,
        }
    },
}))

const Footer = () => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <div className={classes.root}>
                <span>{`Copyright © ${new Date().getFullYear()} Choulc`}</span>
            </div>
        </React.Fragment>
    );
}

export default Footer;