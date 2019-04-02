import React from 'react';
import ReactDOM from 'react-dom';
import NoMatch from './NoMatch';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><NoMatch /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
