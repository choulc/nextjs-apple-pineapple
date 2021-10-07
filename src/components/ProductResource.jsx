import React from 'react';
import { Container } from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from '@emotion/styled'
import theme from '../theme'

const StyledTitle = styled.h2`
    text-align: center;
    color: ${theme.palette.primary.dark};
`
const StyledSliderContainer = styled.div`
    margin: 0 auto;
    max-width: 100%;
    width: 360px;
    padding-left: 15px;
    padding-right: 15px;
    @media (min-width: 600px ){
        width: 560px;
    }
    @media (min-width: 900px ){
        width: 900px;
    }
    @media (min-width: 1200px ){
        width: 1200px;
    }
`
const StyledCardContainer = styled.div`
    display: flex;
    justify-content: center;
`
const StyledCard = styled.div`
    cursor: pointer;
`
const StyledCardImage = styled.div`
    img {
        border-radius: 15px;
        width: 100%;
        height: auto;
    }
`
const StyledCardTitle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px;
    font-size: 1.4rem;
    font-weight: 700;
`
const StyledCardDescription = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4px;
    font-size: 1.2rem;
`


const ProductResource = (props) => {

    const { resourceList } = props

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
                <StyledTitle>
                    產品資源
                </StyledTitle>
                <StyledSliderContainer>
                    <Slider {...settings}>
                        {resourceList.map((resource => (
                            <React.Fragment key={resource.id}>
                                <StyledCardContainer>
                                    <StyledCard>
                                        <StyledCardImage>
                                            <img src={resource.image} alt="resource image" />
                                        </StyledCardImage>
                                        <StyledCardTitle>
                                            <span>{resource.name}</span>
                                        </StyledCardTitle>
                                        <StyledCardDescription>
                                            <span>{resource.description}</span>
                                        </StyledCardDescription>
                                    </StyledCard>
                                </StyledCardContainer>
                            </React.Fragment>
                        )))}
                    </Slider>
                </StyledSliderContainer>
            </Container>

        </React.Fragment>
    );
}

export default ProductResource;