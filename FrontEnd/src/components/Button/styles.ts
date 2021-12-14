import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`

  background: #009EFA;
  height: 2.6rem;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  color: #fff;
  width: 7rem;
  font-weight: 500;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;
  font-size: 15px;
  &:hover {
    background: ${shade(0.2, '#0081CF')}
  }
`;
