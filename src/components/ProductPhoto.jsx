import React from 'react';
import { makeStyles } from '@mui/styles'
import { Container } from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    sliderContainer: {
        margin: '0 auto',
        maxWidth: '100%',
    },
    cardContainer: {
        // width: 400,
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        margin: '0 auto',
        cursor: 'pointer',
    },
}));

const ProductPhoto = (props) => {

    const { imageList } = props
    const classes = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <h2 className={classes.title}>
                    產品照片
                </h2>
                <div className={classes.sliderContainer}>
                    <Slider {...settings}>
                        {imageList.map((image, index) => (
                            <React.Fragment key={index} >
                                <div className={classes.cardContainer}>
                                    <img src={image} alt="image" layout="responsive" />
                                </div>
                            </React.Fragment>
                        ))}
                    </Slider>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default ProductPhoto;