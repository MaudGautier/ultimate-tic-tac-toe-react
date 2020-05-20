// Main script
//
// List of React Components (in external files)
// Game
// BigBoard
// SmallBoard
// Cell
//
// List of other files
// index.css
// functions.js

// React Framework
import React from 'react';
import ReactDOM from 'react-dom';

// CSS files and React Components
import './index.css';
import Game from './Game';



// ====================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
)


