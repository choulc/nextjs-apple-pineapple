import React from 'react';
import { Container } from '@mui/material'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from '@emotion/styled'
import theme from '../theme'

const StyledTitle = styled.h2`
    text-align: center;
    color: ${theme.palette.primary.dark};
`

const StyledGridContainer = styled(Grid)`
    @media (min-width: 1200px){
        display: flex;
        justify-content: center;
    }
`
const StyledCardContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
 `

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    :hover{
        color: red;
    }
 `


const ProductLink = (props) => {

    const { linkList } = props

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <StyledTitle>
                    相關連結
                </StyledTitle>
                <StyledGridContainer container>
                    {linkList.map(link => (
                        <Grid item xs={6} md={4} lg={2} key={link.id}>
                            <StyledCardContainer>
                                <StyledCard>
                                    <div >
                                        <img src={link.image} alt="" />
                                    </div>
                                    <div >
                                        <span>{link.name}</span>
                                    </div>
                                    <div >
                                        <span>{link.description}</span>
                                    </div>
                                    <div >
                                        <Button variant="outlined">{link.buttonText}</Button>
                                    </div>
                                </StyledCard>
                            </StyledCardContainer>
                        </Grid>
                    ))}
                </StyledGridContainer>
            </Container>
        </React.Fragment>
    );
}

export default ProductLink;