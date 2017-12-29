import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {tilesH, tilesV, tileW, tileH, tileSpace, boardMargin , THEME, boardTextFont} from './config';
import SVG from 'svg.js'
import interact from 'interactjs'
import { Letter } from './letter'
import { Utils } from './js/utils/Utils'
import {Word} from './word'

const divStyle = {
  color: 'blue',
  width: 770,
  height: 770,
}

export class Board extends React.Component {
	
  static propTypes = {
    G:        PropTypes.any.isRequired,
    ctx:      PropTypes.any.isRequired,
    endTurn:  PropTypes.func.isRequired,
    moves:    PropTypes.any.isRequired,
  }
  
  
	
  constructor(props) {
	  super(props)
	  this.state = {words:[]}
	  
      this.normalBoard = 'T..d...T...d..T;.D...t...t...D.;..D...d.d...D..;d..D...d...D..d;....D.....D....;.t...t...t...t.;..d...d.d...d..;T..d...X...d..T;..d...d.d...d..;.t...t...t...t.;....D.....D....;d..D...d...D..d;..D...d.d...D..;.D...t...t...D.;T..d...T...d..T'
      this.currentBoard = this.normalBoard
      this.squares = []
      this.squaresByIndex = []

  		// The current letter element
      this.currentLetter = null

  		// A reference for the Vex dialog, used to close custom dialog
      this.dialog = null
	  
      this.occupiedBlocks = []
      this.reverseOccupiedBlocks = []
	  
      for (var i = 0; i < 15; i++) {
        this.occupiedBlocks[i] = []
        for (var j = 0; j < 15; j++)			{
  				// this.occupiedBlocks[i][j] = null;
        }
      }

      this.currentWord = []
	  
  		// Bind function so that they don't lose scope
      this.handleDetachEvent = this.handleDetachEvent.bind(this)
      this.isOnBoard = this.isOnBoard.bind(this)
      this.letterSelected = this.letterSelected.bind(this)
  	  this.onWildcardClick = this.onWildcardClick.bind(this)
	  
	  console.log("TESTING")
	  //console.log( this.props.moves)
      //this.props.endTurn();
	  this.props.G.scores = Array(this.props.ctx.numPlayers).fill(0)
	  console.log(this.props.G.scores)
  }
  
 
	
  isActive(id) {
    if (this.props.G.winner != null) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }
  
	
  
  
  showWildcardPicker () {
    var root = this

    var lettersDiv = "<div class='letterChoices'>"
    for (var i = 0; i < letters.length; i++)		{
      var lett = letters[i]
      if (lett[0] == '*') { continue }

      var style = ''
      if (lett[0].toUpperCase() == 'I')			{
        style = 'padding-left: 5px'
      }
      var divStr = "<div class='letterNoninteractive'> <div class='letterText' " + "style='" + style + "'>" + lett[0].toUpperCase() + "</div> <div class='letterValue'>" + ' ' + "</div> <div class='letterBG'></div> </div>"
      lettersDiv += $(divStr)[0].outerHTML
    }
    lettersDiv += "<div style='width: 100%; min-width: 300px; clear: both;'></div>"
    lettersDiv += '</div>'

  	  this.dialog = vex.dialog.open({
  	      message: 'Select a letter value',
  	      input: [
  		'<style>',
          '.vex-custom-field-wrapper {',
          'margin: 1em 0;',
          '}',
          '.vex-custom-field-wrapper > label {',
          'display: inline-block;',
          'margin-bottom: .2em;',
          '}',
          '</style>',
          lettersDiv
  		  ].join(''),
		  buttons: [],
		  overlayClosesOnClick: false,
  		  callback: function (data) {
  		          if (!data) {
  		          	// Typically cancelled
				  }
  			  }
  		  })

		  // onclick='board.letterSelected(this)'
		  var root = this
		  var children = $('.letterChoices').children()
		  for (var i = 0; i < children.length; i++)		  {
			  	var child = children[i]
		  		$(child).on('click', root.letterSelected)
		  }
  }

	/**
		A callback for the letter being selected from the popup box.  In use for when a wildcard letter is being selected
		@param item - The click event
	*/
  letterSelected (evt) {
    var selectedLetter = $((evt).currentTarget).find('.letterText').text()
    log('Selected Letter: ' + selectedLetter)
	
    $(this.currentLetter).find('.letterText').html(selectedLetter.toUpperCase())
    $(this.currentLetter).find('.letterValue').html(' ')
    $(this.currentLetter).data('ref').letter = selectedLetter.toUpperCase()
    $(this.currentLetter).data('ref').value = 0
    this.dialog.close()
  }
	
  onWildcardClick (evt) {
	  log("onWildcardClick")
	  log(evt.target)
	  this.currentLetter = evt.target
	  this.showWildcardPicker()
  }
  
  
  isOnBoard (el) {
	  var sqrect = $(el).offset()

	  var _top = sqrect.top
	  var _left = sqrect.left
	  
	  this.currentLetter = el
	  var dat = $(this.currentLetter).data("ref")
	  log("CHECK")
		  
	  log(dat)
	  
	  if(dat.wildcard == true)
	  {
  		if(dat.isPlacedOnBoard) {
  		  log("Is on")
			log( $(el).data('events'))
  		}
		else
		{
	  	  this.showWildcardPicker()
		  $(this.currentLetter).off("dblclick")
	      $(this.currentLetter).on("dblclick", this.onWildcardClick)
		}
	  }
    
	   
	if (this.squares[_top]) {
      if (this.squares[_top][_left]) {
    	  var gameSquare = this.squares[_top][_left]
    	  var _i = gameSquare.i
    	  var _j = gameSquare.j

    	  if (this.occupiedBlocks[_i] == null) {
			  this.occupiedBlocks[_i] = []
			  this.addLetterToBoard(el, gameSquare)
			  return
    	  }

    	  if (this.occupiedBlocks[_i][_j] != null)			{
      		var closeBlock = this.findNearestBlock(el, gameSquare)
      		if (closeBlock == null)				{
        		this.resetBlock(el)
      	  	} else				{
        	  var sq = this.squaresByIndex[closeBlock.i][closeBlock.j]
        	  var gSquare = this.squares[sq.top][sq.left]
        	  var eldat = $(el).data('ref')
        	  eldat.setPosition(sq.top, sq.left)
        	  this.addLetterToBoard(el, gSquare)
      		}
    	} 
		else {
			this.addLetterToBoard(el, gameSquare)
    	}
  	}		  
  	else {
		log('No block')
  	}
  } else {
	log('No block')
  }
}
	
	/** * WORD TESTING ***/
  playCurrentWord () {
    log('Play current word')
    var isValid = WordValidator.isWordValid(this.currentWord, this.reverseOccupiedBlocks)
    this.printCurrentWord()
    if (isValid) {
      log('VALID WORD')
		
    }		
	else {
      log('NOT VALID')
      vex.dialog.alert('That word is invalid!')
      return
    }

    WordValidator.checkWordExistence(this.currentWord, function (data) {
      log('result')
      log(data)
      if (data.result_type == 'no_results')				{
        vex.dialog.alert("That word doesn't exist!")
        log('NO RESULT')
      }				else {
        vex.dialog.alert('Definition: ' + data.list[0].definition)
        log('RESULT')
      }
		    })
  }

  printCurrentWord () {
    var theWord = ''
    for (var i = 0; i < this.currentWord.length; i++)		{
      var letter = this.currentWord[i]
      var dat = $(letter).data('ref')
      theWord += dat.letter
    }
    log(theWord)
  }

  resetTiles () {
    for (var i = 0; i < this.currentWord.length; i++)		{
      var el = this.currentWord[i]
      $(el).off(DETACH_FROM_BOARD_EVENT, this.handleDetachEvent)
    }
    this.currentWord = []
    this.occupiedBlocks = []
    this.reverseOccupiedBlocks = []
  }

	/**
		Get a block list of the surrounding block to the current one.  Level indicated how many blocks deep to check, 1 means
		directly adjacent, 2 means 1 block in between the current block and the blocks to seach

	*/
  getSurroundingBlockList (gameSquare) {
    log('GET ')
    log(gameSquare)
    var _i = gameSquare.i
    var _j = gameSquare.j

		// util vars
    var imin = 0, imax = 0, jmin = 0, jmax = 0

		// return tiles
    var tiles = []
    var preferred = []
    var nonpref = []

    imin = _i - 1; imax = _i + 1; jmin = _j - 1; jmax = _j + 1

		// set boundaries
    if (_i == 0) { imin = 0; imax = 1 }
    if (_j == 0) { jmin = 0; jmax = 1 }
    if (_i == tilesH) { imin = tilesH - 1; imax = tilesH }
    if (_j == tilesV) { jmin = tilesV - 1; jmax = tilesV }

    for (var i = imin; i < imax + 1; i++)		{
      for (var j = jmin; j < jmax + 1; j++)			{
        log('checking: ' + i + ' - ' + j)
        if (this.occupiedBlocks[i] == null)				{
          var index = {i: i, j: j}
          if (i == _i || j == _j)					{
            preferred.push(index)
          } else					{
            nonpref.push(index)
          }
          continue
        }

        if (this.occupiedBlocks[i][j] == null)				{
          var index = {i: i, j: j}
          if (i == _i || j == _j)					{
            preferred.push(index)
          } else					{
            nonpref.push(index)
          }
        }
      }
    }
    Utils.shuffleArray(preferred)
    tiles = tiles.concat(preferred)
    tiles = tiles.concat(nonpref)
    return tiles
  }

  findNearestBlock (el, gameSquare) {
    var closest = this.getSurroundingBlockList(gameSquare)
    if (closest.length == 0)		{
      return null
    }

    return closest[0]
  }

	// Add a letter div
  addLetterToBoard (el, gameSquare) {
		// log(el);

    var dat = $(el).data('ref')
    log('Add letter ' + dat.letter + ' to board at: ' + gameSquare.i + ':' + gameSquare.j)

	dat.isPlacedOnBoard = true
    var _i = gameSquare.i.toString()
    var _j = gameSquare.j.toString()

    if (!this.occupiedBlocks[_i])		{
      this.occupiedBlocks[_i] = []
    }

	  	this.occupiedBlocks[_i][_j] = el
	  	this.reverseOccupiedBlocks[dat.id] = gameSquare
	  	this.currentWord.push(el)

    log(this.currentWord)
	  	$(el).on(DETACH_FROM_BOARD_EVENT, this.handleDetachEvent)
	  	$(el).data('ref').onBoard = true
  }

  handleDetachEvent (event) {
		// log(event);
    var el = event.target
    var dat = $(el).data('ref')

    let gameSquare = this.reverseOccupiedBlocks[dat.id]

    log('detach ' + dat.letter + ' from: ' + gameSquare.i + ':' + gameSquare.j)

    var _i = gameSquare.i
    var _j = gameSquare.j

    $(el).off(DETACH_FROM_BOARD_EVENT, this.handleDetachEvent)
    this.occupiedBlocks[_i][_j] = null
    delete this.reverseOccupiedBlocks[dat.id]

    for (var i = 0; i < this.currentWord.length; i++)		{
			// var wordData = $(el).data("ref");
      if (this.currentWord[i] == el)			{
        this.currentWord.splice(i, 1)
        break
      }
    }

    log(this.currentWord)
  }

	// Reset letter div
  resetBlock (letter) {
    var dat = $(letter).data('ref')
    $(letter).off(DETACH_FROM_BOARD_EVENT, this.handleDetachEvent)
    dat.onBoard = false
    dat.resetPosition()
  }

  addWord (letters) {

  }

	/**
		Draw a normal board
	*/
  drawNormalBoard () {
    this.drawBoard(this.normalBoard)
  }
  
	
	/**
		Draw a random board
	*/
  drawRandomBoard () {
    var rows = this.normalBoard.split(';')
    var newBoard = ''

    for (var i = 0; i < rows.length; i++)		{
      var row = rows[i]
      var columns = row.split('')
      log(columns)
      Utils.shuffleArray(columns)
      newBoard += columns.join('') + ';'
      log(columns)
    }

    this.currentBoard = newBoard
    this.drawBoard(this.currentBoard)
  }
  
  
  
  componentDidMount() {
      //var $this = $(ReactDOM.findDOMNode(this));
      // set el height and width etc.
	  console.log("Mount")
	  console.log(ReactDOM.findDOMNode(this))
	  this.drawBoard(this.normalBoard)
	  
      var root = this
      interact(this.refs.board).dropzone({
  		  // only accept elements matching this CSS selector
  		  accept: '.letter',
  		  // Require a 75% element overlap for a drop to be possible
  		  overlap: 0.75,

  		  // listen for drop related events:
  		  ondropactivate: function (event) {

  		  },
  		  ondragenter: function (event) {
  			  var el = event.relatedTarget, dropzoneElement = event.target
  			  var dat = $(el).data('ref')
  			  // log(dat);
  			  dat.onBoard = true
  		  },
  		  ondragleave: function (event) {
  			  var el = event.relatedTarget, dropzoneElement = event.target
  			  var dat = $(el).data('ref')
  			  dat.onBoard = false
  		  },

  		  ondrop: function (event) {
  			  var dx = event.relatedTarget.getAttribute('data-x')
  			  var dy = event.relatedTarget.getAttribute('data-y')
			  
  			  root.isOnBoard(event.relatedTarget)
  		  },
  		  ondropdeactivate: function (event) {
  		    // remove active dropzone feedback
  		    event.target.classList.remove('drop-active')
  		    event.target.classList.remove('drop-target')
  		  }
      })
	  
    }
	
  
  
	/**
		Draw a board according to the format string provided
		@param boardString:String - A string indicating what blocks are what
	*/
  
	
  drawBoard (boardString) {
	  console.log("Draw board")
	  
    //$('#board').empty()
    var boardWidth = (tileW + tileSpace) * tilesH + boardMargin
    var boardHeight = (tileH + tileSpace) * tilesV + boardMargin
    //$('#board').css('width', boardWidth)
    //$('#board').css('height', boardHeight)	
	//divStyle.width = boardWidth
	//divStyle.height = boardHeight
	  
    var rows = boardString.split(';')
	  
    var draw = SVG(this.refs.board)
    draw.rect(boardWidth, boardHeight).fill(THEME.boardBGColor)
	
    var sq
	
    for (var i = 0; i < tilesH; i++) {
      var row = rows[i]
      var columns = row.split('')

      for (var j = 0; j < tilesV; j++) {
        var xpos = boardMargin / 2 + j * (tileW + tileSpace)
        var ypos = boardMargin / 2 + i * (tileH + tileSpace)
		  
        var textXpos = boardMargin / 2 + j * (tileW + tileSpace) + tileW / 2
        var textYpos = boardMargin / 2 + i * (tileH + tileSpace) + tileH / 3 - 3
		  
        var tx
        switch (columns[j])	{
          case '.':
            sq = draw.rect(tileW, tileH).move(xpos, ypos).fill(THEME.normalTileColor)
            break
          case 'T':
            {
              sq = draw.rect(tileW, tileH).move(xpos, ypos).fill(THEME.tripleWordColor)
              tx = draw.text('TW').move(textXpos, textYpos).fill(THEME.boardTextColor)
              break
            }
          case 'D':
            {
              sq = draw.rect(tileW, tileH).move(xpos, ypos).fill(THEME.doubleWordColor)
              tx = draw.text('DW').move(textXpos, textYpos).fill(THEME.boardTextColor)
              break
            }
          case 't':
            {
              sq = draw.rect(tileW, tileH).move(xpos, ypos).fill(THEME.tripleLetterColor)
              tx = draw.text('TL').move(textXpos, textYpos).fill(THEME.boardTextColor)
              break
            }
          case 'd':
            {
              sq = draw.rect(tileW, tileH).move(xpos, ypos).fill(THEME.doubleLetterColor)
              tx = draw.text('DL').move(textXpos, textYpos).fill(THEME.boardTextColor)
              break
            }
          case 'X':
            {
              sq = draw.rect(tileW, tileH).move(xpos, ypos).fill(THEME.doubleWordColor)
              tx = draw.text('X').move(textXpos, textYpos).fill(THEME.boardTextColor)
              break
            }
        }
		
        if (tx)	{
          tx.font(boardTextFont)
        }
		
		//console.log("x")
		//console.log(ReactDOM.findDOMNode(sq.node).x.baseVal.value)
		
		
        //var elRect = $(sq.node).offset()// sq.node.getBoundingClientRect();
		var aNode = ReactDOM.findDOMNode(sq.node)
		var elRect = {top: aNode.y.baseVal.value, left: aNode.x.baseVal.value}
		//console.log(elRect)
		
        if (!this.squares['' + elRect.top]) {
          this.squares['' + elRect.top] = {}
        }
		
        this.squares['' + elRect.top]['' + elRect.left] = {el: sq, i: i, j: j, type: columns[j]}
        if (this.squaresByIndex[i] == null)				{
          this.squaresByIndex[i] = []
        }
        this.squaresByIndex[i][j] = {el: sq, top: '' + elRect.top, left: '' + elRect.left, type: columns[j]}
		
		
		}
    } // end outer for
		// log(this.squares);
  }
  detachLetter(aLetter) {
  	console.log("DETACH")
	  console.log(aLetter.target)
	  
  }
  
  createLetters() {
	  var w1 = new Word()
	  
	  console.log("CREATE")
	  console.log(this.state.words)
	  var divs = []
	  for(var i = 0; i < 10; i++)
	  {
	  	divs.push(<Letter letter='A' value='10' key={Utils.UUID()} dragStart={this.detachLetter}></Letter>)
		  
	  }
  	return divs
  }
  
  render() {
	  console.log("render")
	  console.log(divStyle)
	  
	  
	  
    return (
	  <div id="board" ref="board" className="dropzone" style={divStyle}>
		{this.createLetters()}
		</div>
		
		
    );
	
  }
  
  
}
