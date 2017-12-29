/**
	A utility class for Board used to validate words
*/
export class WordValidator {
  static isWordValid (currentWord, reverseOccupiedBlocks) {
		// Letters have to be in a straight line
    var isLinear = WordValidator.checkLinearity(currentWord, reverseOccupiedBlocks)
    if (isLinear == null)		{
      return false
    }

		// Sort the word
    WordValidator.sortWord(currentWord, reverseOccupiedBlocks)

		// Are the letters consecutive, meaning no spaces in between letters
    var areConsecutive = WordValidator.areLettersConsecutive(currentWord, reverseOccupiedBlocks)
    if (areConsecutive == false)		{
      log('NOT CONSECUTIVE')
      return false
    }

    return true
  }

  static checkLinearity (currentWord, reverseOccupiedBlocks) {
    var horizontal = true
    var vertical = true

    var firsti = -1
    var firstj = -1
    for (var i = 0; i < currentWord.length; i++)		{
      var letter = currentWord[i]
      var dat = $(letter).data('ref')
      var sq = reverseOccupiedBlocks[dat.id]

      if (i == 0)			{
        firsti = sq.i
        firstj = sq.j
      } else {
        if (firsti != sq.i) { horizontal = false }
        if (firstj != sq.j) { vertical = false }
      }
    }

    if (horizontal) { return 'H' }
    if (vertical) { return 'V' }
    return false
  }

  static sortWord (currentWord, reverseOccupiedBlocks) {
    var isLinear = WordValidator.checkLinearity(currentWord, reverseOccupiedBlocks)
    var reverseOccupiedBlocks = reverseOccupiedBlocks

    if (isLinear == 'H')		{
      currentWord.sort(function (a, b) {
        var adat = $(a).data('ref')
        var bdat = $(b).data('ref')
        var sq1 = reverseOccupiedBlocks[adat.id]
        var sq2 = reverseOccupiedBlocks[bdat.id]

		        var result = (sq1.j < sq2.j) ? -1 : (sq1.j > sq2.j) ? 1 : 0
		        return result
      })
    }		else		{
      currentWord.sort(function (a, b) {
        var adat = $(a).data('ref')
        var bdat = $(b).data('ref')
        var sq1 = reverseOccupiedBlocks[adat.id]
        var sq2 = reverseOccupiedBlocks[bdat.id]

		        var result = (sq1.i < sq2.i) ? -1 : (sq1.i > sq2.i) ? 1 : 0
		        return result
      })
    }
  }

  static areLettersConsecutive (currentWord, reverseOccupiedBlocks) {
    var lin = WordValidator.checkLinearity(currentWord, reverseOccupiedBlocks)
    if (lin == false)		{
      return false
    }

    var index = 'j'
    index = lin === 'H' ? 'j' : 'i'

    var oldSq
    for (var k = 0; k < currentWord.length; k++)		{
      var letter = currentWord[k]
      var dat = $(letter).data('ref')
      var sq = reverseOccupiedBlocks[dat.id]

      if (k == 0)			{
        oldSq = sq
      } else			{
        if (sq[index] != oldSq[index] + 1) { return false }
      }
      oldSq = sq
    }

    return true
  }

  static getCurrentWordString (currentWord) {
    var theWord = ''
    for (var i = 0; i < currentWord.length; i++)		{
      var letter = currentWord[i]
      var dat = $(letter).data('ref')
      theWord += dat.letter
    }
    return theWord
  }

  static checkWordExistence (currentWord, complete) {
    var theWord = WordValidator.getCurrentWordString(currentWord)

    $.ajax({
		        url: 'http://api.urbandictionary.com/v0/define?term=' + theWord
		    }).then(complete)
  }

  static checkCrossWords () {

  }
}
