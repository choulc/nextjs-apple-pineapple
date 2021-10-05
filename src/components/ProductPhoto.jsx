import React from 'react';
import { makeStyles } from '@mui/styles'
import { Container } from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    sliderContainer: {
        margin: '0 auto',
        maxWidth: '100%',
        paddingLeft: 15,
        paddingRight: 15,
    },
    cardContainer: {
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        margin: '0 auto',
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    nextArrow: {
        fontSize: 0,
        lineeight: 0,
        position: 'absolute',
        top: '50%',
        right: -25,
        display: 'block',
        width: 20,
        height: 20,
        padding: 0,
        WebkitTransform: 'translate(0, -50%)',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        color: theme.palette.secondary.main,
        border: 'none',
        outline: 'none',
        background: 'transparent',
        '&:hover': {
            color: theme.palette.secondary.dark,
        }
    },
    previousArrow: {
        fontSize: 0,
        lineeight: 0,
        position: 'absolute',
        top: '50%',
        left: -25,
        display: 'block',
        width: 20,
        height: 20,
        padding: 0,
        WebkitTransform: 'translate(0, -50%)',
        transform: 'translate(0, -50%)',
        cursor: 'pointer',
        color: theme.palette.secondary.main,
        border: 'none',
        outline: 'none',
        background: 'transparent',
        '&:hover': {
            color: theme.palette.secondary.dark,
        }
    }
}));

function SampleNextArrow(props) {
    const { className, style, onClick, styledNextArrow } = props;
    return (
        <div
            className={styledNextArrow}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        >
            <ArrowForwardIosIcon />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick, styledPreviousArrow } = props;
    return (
        <div
            className={styledPreviousArrow}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <ArrowBackIosNewIcon />
        </div>
    );
}

const ProductPhoto = (props) => {

    const { imageList } = props
    const classes = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow styledNextArrow={classes.nextArrow} />,
        prevArrow: <SamplePrevArrow styledPreviousArrow={classes.previousArrow} />,
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
                                    <img src={image} alt="image" className={classes.image} />
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