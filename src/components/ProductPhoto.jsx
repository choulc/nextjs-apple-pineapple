import React from 'react';
import { Container } from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styled from '@emotion/styled'
import theme from '../theme'

const StyledTitle = styled.h2`
    text-align: center;
    color: ${theme.palette.primary.dark};
`

const StyledSliderContainer = styled.div`
    margin: 0 auto;
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
`

const StyledCardContainer = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: center;
`

const StyledImage = styled.img`
    width: 100%;
    height: auto;
`

const StyledNextArrow = styled.div`
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    right: -25px;
    display: block;
    width: 20px;
    height: 20px;
    padding: 0;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    color: ${theme.palette.secondary.main};
    border: none;
    outline: none;
    background: transparent;
    :hover {
        color: ${theme.palette.secondary.dark}
    }
`

const StyledPreviousArrow = styled.div`
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    left: -25px;
    display: block;
    width: 20px;
    height: 20px;
    padding: 0;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    color: ${theme.palette.secondary.main};
    border: none;
    outline: none;
    background: transparent;
    :hover {
        color: ${theme.palette.secondary.dark}
    }
`

function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
        <StyledNextArrow
            style={{ ...style, display: "block", }}
            onClick={onClick}
        >
            <ArrowForwardIosIcon />
        </StyledNextArrow>
    );
}

function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
        <StyledPreviousArrow
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <ArrowBackIosNewIcon />
        </StyledPreviousArrow>
    );
}

const ProductPhoto = (props) => {

    const { imageList } = props

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <StyledTitle>
                    產品照片
                </StyledTitle>
                <StyledSliderContainer>
                    <Slider {...settings}>
                        {imageList.map((image, index) => (
                            <React.Fragment key={index} >
                                <StyledCardContainer>
                                    <StyledImage src={image} alt="image" />
                                </StyledCardContainer>
                            </React.Fragment>
                        ))}
                    </Slider>
                </StyledSliderContainer>
            </Container>
        </React.Fragment>
    );
}

export default ProductPhoto;