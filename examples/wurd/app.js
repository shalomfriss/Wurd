/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { render } from 'react-dom';
import Client from 'boardgame.io/client';
import { Wurd } from './wurd';
import { Board } from './board'
import './app.css';
import { createStore } from 'redux'
import ReactDOM from 'react-dom';

export const App = Client({
  game: Wurd,
  board: Board,
  multiplayer: true,
});

//render(<App gameID="gameid"/>, document.getElementById('app') || document.createElement('div'));			   
ReactDOM.render(<App gameID="gameid"/>, document.getElementById('app') || document.createElement('div'));

if (module.hot) {
  module.hot.accept();
}

