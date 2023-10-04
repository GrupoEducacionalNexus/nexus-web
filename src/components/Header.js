import React from 'react';
import styled from 'styled-components';

export default function Header({children}) {
    return (
        <Container>
            {children}
        </Container>

    )
}

export const Container = styled.div`
    display: flex;
    justify-content: center; /* Centraliza horizontalmente */
    align-items: center; /* Centraliza verticalmente */
    width: 100%;
    height: 100px;

    .button-menu {
        width: 230px; /* Define a largura desejada */
        max-height: 50px; 
        background-color: #000233;
        border-radius: 5px;
        border: 1px solid #000233;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 16px;
        padding: 4px 10px;
        text-decoration: none;
        text-shadow: 0px 1px 0px #2f6627;
    }
      
    .button-menu:hover {
        background-color: #f5f5f5;
        color: #000233;
    }
`;
