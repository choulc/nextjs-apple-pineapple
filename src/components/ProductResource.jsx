import React from 'react';
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    sliderContainer: {
        margin: '0 auto',
        maxWidth: '100%',
        width: 360,
        [theme.breakpoints.up('sm')]: {
            width: 560,
            // marginTop: '10vh',
        },
        [theme.breakpoints.up('md')]: {
            width: 900,
            // marginTop: '15vh',
        },
        [theme.breakpoints.up('lg')]: {
            width: 1200,
            // marginTop: '10vh',
            // marginBottom: '10vh',
        },
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        cursor: 'pointer',
    },
    cardImage: {
        '& img': {
            borderRadius: 15,
            width: '100%',
            height: 'auto',
        }
    },
    cardTitle: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 16,
        fontSize: '1.4rem',
        fontWeight: 700,
    },
    cardDescription: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 4,
        fontSize: '1.2rem',
    },
}));

const ProductResource = (props) => {

    const { resourceList } = props

    const classes = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        centerMode: false,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <h2 className={classes.title}>
                    產品資源
                </h2>
                <div className={classes.sliderContainer}>
                    <Slider {...settings}>
                        {resourceList.map((resource => (
                            <React.Fragment key={resource.id}>
                                <div className={classes.cardContainer}>
                                    <div className={classes.card}>
                                        <div className={classes.cardImage}>
                                            <img src={resource.image} alt="resource image" />
                                        </div>
                                        <div className={classes.cardTitle}>
                                            <span>{resource.name}</span>
                                        </div>
                                        <div className={classes.cardDescription}>
                                            <span>{resource.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )))}
                    </Slider>
                </div>
            </Container>

        </React.Fragment>
    );
}

export default ProductResource;