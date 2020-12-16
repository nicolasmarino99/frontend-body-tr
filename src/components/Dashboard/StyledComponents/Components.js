import React from 'react';
import styled, { keyframes } from 'styled-components';

const makeBig = x => {
    const bigOnes = new Array(50).fill(0);
    for (let i = 0; i < bigOnes.length; i++) {
      if (i % 2 === 1) {
          bigOnes[i] = bigOnes[i-1]+1
      } else {
        bigOnes[i] = i-1 === -1 ? 0 : bigOnes[i-1]+3
      }
    }
      bigOnes.map(x => x-1)
      return bigOnes.includes(x)
  }

    const CategoryCont = styled.div`
      background: url(${props => props.img});
      background-size: cover;
      font-family: 'Oswald', sans-serif;
      text-transform: uppercase;
      margin: 7px 0;
      letter-spacing: 1px;
      color: white;
      display: flex;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      height: ${props => makeBig(props.num) || props.num === 0 ? 12 : 8}em;
      width: 8em;
      background-color: #59c584;
      border-radius: 10px;
      position: relative;
      top :${props =>  props.num >= 4 ? -64*(Math.floor(props.num/4)) : 0}px;
    `;

const Paragraph = styled.p`
background: #00000063;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
margin-top: 15px;
border-radius: 6%;
display: flex;
flex-direction: column-reverse;
`;

export {Paragraph, CategoryCont}