import React from 'react';
import { render } from 'react-dom';
import Nav from './Nav';

render(
	<Nav {...window.Nav} />,
	document.getElementById('react-nav')
);
