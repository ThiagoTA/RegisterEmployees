import styled, { css } from 'styled-components';


interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

  border: 1px solid #fff;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  padding: 9px;
  width: 40%;
  color: #fff;


  display: flex;
  align-items: center;

  & + div {
    margin-top: 15px;
  }

  ${(props) => props.isErrored
    && css`
      border-color: #c53030;
    `}

  ${(props) => props.isFocused
    && css`
      border-color: #009EFA;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fff;


    &::placeholder {
      color: #a6a6a6;
    }
  }

`;

