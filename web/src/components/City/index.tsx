import React from 'react';

import { Container } from './styles';

export interface Props {
  textAlign?: string;
}

const City: React.FC<Props> = ({
  textAlign
}) => {
  return (
    <Container textAlign={textAlign}>
      <strong>Cotia</strong>
      <span>São Paulo</span>
    </Container>
  );
};

export default City;
