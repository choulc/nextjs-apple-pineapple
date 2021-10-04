import React from 'react'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
}));

const ProductInfo = (props) => {

    const { productInfo } = props
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <h2 className={classes.title}>
                    產品介紹
                </h2>
                <div>
                    {`規格：${productInfo.spec}`}
                </div>
                <div>
                    {`產地：${productInfo.origin}`}
                </div>
                <div>
                    {`檢驗標準：${productInfo.validation}`}
                </div>
                <div>
                    {`保存方式：${productInfo.preservation}`}
                </div>
            </Container>
        </React.Fragment>
    );
}

export default ProductInfo;