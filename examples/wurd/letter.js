import React from 'react';
import { Utils } from './js/utils/Utils'
import interact from 'interactjs'
import {tilesH, tilesV, tileW, tileH, tileSpace, boardMargin , THEME, boardTextFont} from './config';
import './css/style.css'
import Draggable from 'react-draggable';
import {letterTileWidth, letterTileHeight} from './config'

const divStyle = {
  color: 'blue',
  width: 770,
  height: 770,
	
}

/**
	A playable letter
*/
export class Letter extends React.Component {
	
	
	/**
		@param letter:String - The letter this should be Ex: "H"
		@param value:Number - The value of the letter Ex: 4
	*/
  constructor (props) {
	  
	  super(props)
	  
	  console.log("LETER")
	  console.log(props)
    this.letter = props.letter
    this.value = props.value
	this.wildcard = false
	this.interactive = true
	
    
    //this.setHtml()
	  
    this.originalPosition = null
    this.onBoard = false
	this.isPlacedOnBoard = false
	  
    this.id = Utils.UUID()
    //$(this.div).data('ref', this)
	  
	  /*
    var root = this
    interact('.letter')
		  .draggable({
		    // enable inertial throwing
		    inertia: true,
			  snap: {
				      targets: [
				        interact.createSnapGrid({ x: tileW + tileSpace, y: tileH + tileSpace })
				      ],
				      range: Infinity,
				      relativePoints: [ { x: 34, y: 34 } ]
				    },
		    // keep the element within the area of it's parent
		    restrict: {
		      endOnly: true,
		      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		    },
		    // enable autoScroll
		    autoScroll: true,
			  onstart: root.props.dragStart,
			
		    // call this function on every dragmove event
		    onmove: root.dragMoveListener,
		    // call this function on every dragend event
		    onend: root.dragEnd
		  })
	  
	  */
  }

  setHtml() {
	  $(this.div).html("")
	  
	  var style = ''
      if (this.interactive == true)		{
        if (this.letter.toUpperCase() == 'I')			{
          style = 'padding-left: 5px'
        }
        if (this.letter.toUpperCase() == 'T')			{
          style = 'padding-left: 2px'
        }
        this.divStr = "<div class='letter'> <div class='letterText' style='" + style + "'>" + this.letter.toUpperCase() + "</div> <div class='letterValue'>" + this.value + "</div> <div class='letterBG'></div> </div>"
      }		else		{
        this.divStr = "<div class='letterNoninteractive'> <div class='letterText'>" + this.letter.toUpperCase() + "</div> <div class='letterValue'>" + this.value + "</div> <div class='letterBG'></div> </div>"
      }

      this.div = $(this.divStr)
  }
  
  initDrag () {

  }

  setOriginalPosition (top, left) {
    this.originalPosition = {top: top, left: left}
  }

  setPosition (top, left) {
    $(this.div[0]).offset({top: top, left: left})
  }

  resetPosition () {
    if (this.originalPosition == null) {
      return
    }
	
	$(this).off("dblclick")
	
	this.isPlacedOnBoard = false
	if(this.wildcard == true)
	{
		this.letter = "*"
		$(this.div).find(".letterText").html("*")
		$(this.div).find(".letterValue").html("0")
	}
    $(this.div[0]).offset({top: this.originalPosition.top, left: this.originalPosition.left})
  }

  dragEnd (event) {
    //var data = $(event.target).data('ref')
	  /*
    if (data.onBoard == false)		{
      data.resetPosition()
    }
	  */
  }

  dragStart (event) {
		// event.target.setAttribute('z-index', 1000);
    //var data = $(event.target).data('ref')

    //$(data.div).trigger(DETACH_FROM_BOARD_EVENT)
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
		// target.setAttribute('z-index', this.zcount);
	  }
	  
  	
	render() {
  	  var style = ''
        if (this.interactive == true) {
          if (this.letter.toUpperCase() == 'I')	{
            style = {paddingLeft: 5}
          }
          if (this.letter.toUpperCase() == 'T')	{
            style = {paddingLeft: 2}
          }
          
		  return (
			  <Draggable grid={[letterTileWidth, letterTileHeight]}>
		  	<div className='letter'> <div className='letterText' >{this.letter.toUpperCase()}</div> <div className='letterValue'>{this.value}</div> <div className='letterBG'></div> </div>
		  	</Draggable>
		  );
        } 
		else {
          return (
			  <Draggable grid={letterTileWidth, letterTileHeight}>
          	<div className='letterNoninteractive'> <div className='letterText'>{this.letter.toUpperCase()}</div> <div className='letterValue'>{this.value}</div> <div className='letterBG'></div> </div>
         	 </Draggable>
		  );
        }
			
	  
	
	}
	  
  
}
