/**
	General utilities
*/
export class Utils {
	/**
		Shuffle the contents of the current array
		@param array:Array - The array to shuffle
	*/
  static shuffleArray (array) {
    	for (var i = array.length - 1; i > 0; i--) {
        	var j = Math.floor(Math.random() * (i + 1))
        	var temp = array[i]
        	array[i] = array[j]
        	array[j] = temp
    	}
  }
  static UUID () {
    	// http://www.ietf.org/rfc/rfc4122.txt
    	var s = []
    	var hexDigits = '0123456789abcdef'
    	for (var i = 0; i < 36; i++) {
        	s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    	}
    	s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    	s[8] = s[13] = s[18] = s[23] = '-'

    	var uuid = s.join('')
    	return uuid
  }
}
