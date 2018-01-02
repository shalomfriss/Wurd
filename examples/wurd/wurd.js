/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import Game from 'boardgame.io/game';
import {tilesH, tilesV} from './config'

function IsVictory(cells) {
	
	console.log("CELL")
	console.log(cells)
  return false;
}

export const Wurd = Game({
	constructor() {
		console.log("GAEEE")
	},
	
  G: {
    cells: Array(tilesH).fill(Array(tilesV)),
    winner: null,
	scores: Array(),
  },

  moves: {
	  
	  /**
	  	Add a word to the board
	  	@param G - The game object
	  	@param ctx - The player context
	  	@param row - The row to place the word
	  	@param column - The column to place the word
	  	@param horizontal - A boolean indicating if the word is horizontal
	  */
	  addWord(G, ctx, word, row, column, horizonal) {
		const cells = [...G.cells];
        let winner = null;
        if (IsVictory(cells)) {
          winner = ctx.currentPlayer;
        }
		
	  	return { ...G, cells, winner };
	  },
	  
	  addLetter(G, ctx, letter, row, column) {
		  
	  	return { ...G, cells, winner };
	  },
	  
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }
	  
      let winner = null;
      if (IsVictory(cells)) {
        winner = ctx.currentPlayer;
      }

      return { ...G, cells, winner };
    }
  }
});

