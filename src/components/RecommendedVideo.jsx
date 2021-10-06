import React, { useState } from 'react';
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
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

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    sliderContainer: {
        margin: '0 auto',
        maxWidth: '100%',
        width: 360,
        height: 300,
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
        width: 400,
        maxWidth: '100%',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        margin: '0 auto',
        cursor: 'pointer',
    },
    iframeContainer: {
        borderRadius: 0,
        background: '#000',
        width: 336,
        height: 189,
        [theme.breakpoints.up('sm')]: {
            width: 576,
            height: 324,
        },
        [theme.breakpoints.up('md')]: {
            width: 880,
            height: 495,
        },
        [theme.breakpoints.up('lg')]: {
            width: 1200,
            height: 675,
        },
    }
}));

const RecommendedVideo = (props) => {

    const { videoList } = props

    const classes = useStyles();
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
                <h2 className={classes.title}>
                    推薦影片
                </h2>
                <div className={classes.sliderContainer}>
                    <Slider {...settings}>
                        {videoList.map((videoObject, index) => (
                            <React.Fragment key={index}>
                                <div className={classes.cardContainer} onClick={() => { handleCardClicked(videoObject.id) }}>
                                    <Card className={classes.card}>
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
                                    </Card>
                                </div>
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
                                            <div className={classes.iframeContainer}>
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={videoObject.link}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </Box>
                                    </Fade>
                                </Modal>
                            </React.Fragment>
                        ))}
                    </Slider>
                </div>
            </Container>
        </React.Fragment >
    );
}

export default RecommendedVideo;