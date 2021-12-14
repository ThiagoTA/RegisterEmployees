import { shade } from 'polished';
import styled from 'styled-components';

export const Buttonn = styled.button`

  background:  #ffca2c;
  height: 38px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  color: #fff;
  width: 15%;
  font-weight: 500;
  margin-top: 16px;
  margin-left: 10%;
  transition: background-color 0.2s;
  margin-right: 5px;
  font-size: 15px;
  &:hover {
    background: ${shade(0, '#F7EA00')}
  }
`;
