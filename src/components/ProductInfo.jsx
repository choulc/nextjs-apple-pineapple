import React from 'react'
import { Container } from '@mui/material'
import styled from '@emotion/styled'
import theme from '../theme'

const StyledTitle = styled.h2`
    text-align: center;
    color: ${theme.palette.primary.dark};
`


const ProductInfo = (props) => {

    const { productInfo } = props

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <StyledTitle>
                    產品介紹
                </StyledTitle>
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