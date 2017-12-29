import React from 'react';

export class Hand extends React.Component {
  constructor () {
    this.hand = $("<div class='playerPieces'></div>")
    this.letters = []

    $('body').append(this.hand)
  }
	
  recallHand () {
    log('recall')
    log(this.letters)
    for (var i = 0; i < this.letters.length; i++) {
      var aLetter = this.letters[i]
      aLetter.resetPosition()
    }
  }

  shuffleHand () {
    this.recallHand()
    var pos = []
    for (var i = 0; i < this.letters.length; i++) {
      var aLetter = this.letters[i]
      pos.push(aLetter.originalPosition)
    }

    Utils.shuffleArray(pos)
    for (var i = 0; i < this.letters.length; i++) {
      var aLetter = this.letters[i]
      aLetter.originalPosition = pos[i]
      aLetter.resetPosition()
    }
  }

  addLetters (letters) {
    for (var i = 0; i < letters.length; i++) {
      var aLetter = letters[i]
      $(this.hand).append(aLetter.div)
      var opos = $(aLetter.div).offset()
      aLetter.setOriginalPosition(opos.top, opos.left)
      this.letters.push(aLetter)
    }
  }

  removeLetters (letters) {
    for (var i = 0; i < letters.length; i++) {

    }
  }

  dragMoveListener (event) {
	    var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + y + 'px)'

	    // update the posiion attributes
	    target.setAttribute('data-x', x)
	    target.setAttribute('data-y', y)
	  }
}
