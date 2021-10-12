import React from 'react';
import styled from '@emotion/styled'
import theme from '../theme'

const StyledFooter = styled.div`
height: 80px;
background-color: ${theme.palette.primary.main};
color: #fff;
display: flex;
justify-content: center;
align-items: center;
font-size: 13px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Footer = () => {

    return (
        <React.Fragment>
            <StyledFooter>
                <span>{`${new Date().getFullYear()} choulc@github`}</span>
            </StyledFooter>
        </React.Fragment>
    );
}

export default Footer;