import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

export default function RenderWithRounter(component) {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      { component }
    </Router>,
  );

  return { history };
}
