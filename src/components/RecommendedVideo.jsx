import React, { useState } from 'react';
import { Container } from '@mui/material'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
    height: 300px;
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
    width: 400px;
    max-width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
`
const StyledCard = styled(Card)`
width: 100%;
margin: 0 auto;
cursor: pointer;
`
const StyledIframeContainer = styled.div`
    border-radius: 0;
    background: #000;
    width:100vw;
    max-width: calc(100vh/9*16); 
    height: calc(100vw/16*9);
    max-height: 100vh; 
`

const RecommendedVideo = (props) => {

    const { videoList } = props

    const [open, setOpen] = useState(0);

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

    const handleCardClicked = (videoId) => {
        setOpen(videoId);
    }

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <StyledTitle>
                    推薦影片
                </StyledTitle>
                <StyledSliderContainer>
                    <Slider {...settings}>
                        {videoList.map((videoObject, index) => (
                            <React.Fragment key={index}>
                                <StyledCardContainer onClick={() => { handleCardClicked(videoObject.id) }}>
                                    <StyledCard>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={videoObject.image}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {videoObject.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {videoObject.description}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </StyledCardContainer>
                                <Modal
                                    aria-labelledby={`transition-modal-${videoObject.id}`}
                                    aria-describedby="transition-modal-description"
                                    open={open == videoObject.id}
                                    onClose={() => { setOpen(0) }}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                        style: {
                                            backgroundColor: 'rgba(0,0,0,0.2)'
                                        }
                                    }}
                                >
                                    <Fade in={open == videoObject.id}>
                                        <Box sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}>
                                            <StyledIframeContainer>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={() => { setOpen(0) }}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        color: (theme) => theme.palette.grey[500],
                                                        background: theme.palette.secondary.main,
                                                        '&:hover': {
                                                            color: theme.palette.secondary.contrastText,
                                                            background: theme.palette.secondary.dark,
                                                        }
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={videoObject.link}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </StyledIframeContainer>
                                        </Box>
                                    </Fade>
                                </Modal>
                            </React.Fragment>
                        ))}
                    </Slider>
                </StyledSliderContainer>
            </Container>
        </React.Fragment >
    );
}

export default RecommendedVideo;