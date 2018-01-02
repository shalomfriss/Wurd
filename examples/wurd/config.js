//https://github.com/mzabriskie/react-draggable

// Sizes
export const tilesH = 15
export const tilesV = 15
export const tileW = 48
export const tileH = 48
export const tileSpace = 2
export const boardMargin = 20

export const letterTileWidth = 50
export const letterTileHeight = 50
export const letterTileXCorrection = 10
export const letterTileYCorrection = -15

// Counts
export const tripleWordScores = 8
export const doubleWordScores = 17
export const tripleLetterScores = 12
export const doubleLetterScores = 16

// Fonts
export const boardTextFont = {
				  	family: 'Helvetica',
					//, size:     144
  anchor: 'middle',
  baseline: 'middle',
  leading: '1.5em',
  weight: 'bold'
}

// Colors
export const NormalTheme = {
  normalTileColor: '#E8DACF',
  tripleWordColor: '#DB3815',
  doubleWordColor: '#E7688C',
  tripleLetterColor: '#3988C3',
  doubleLetterColor: '#61A0CF',
  boardTextColor: '#ffffff',
  boardBGColor: '#252525',
  letterTextColor: '#252525'
}

export const MildTheme = {
  normalTileColor: '#f0f0f0',
  tripleWordColor: '#4d8ba3',
  doubleWordColor: '#66bcdc',
  tripleLetterColor: '#757671',
  doubleLetterColor: '#afaba0',
  boardTextColor: '#ffffff',
  boardBGColor: '#252525',
  letterTextColor: '#252525'
}

export const DarkTheme = {
  normalTileColor: '#000000',
  tripleWordColor: '#751729',
  doubleWordColor: '#db2749',
  tripleLetterColor: '#4d8ba3',
  doubleLetterColor: '#66bcdc',
  boardTextColor: '#ffffff',
  boardBGColor: '#252525',
  letterTextColor: '#252525'
}

export const THEME = MildTheme

// Letter counts
export const letters = [['a', 1, 10], ['b', 4, 2], ['c', 4, 2], ['d', 2, 5], ['e', 1, 12],
                ['f', 4, 2], ['g', 3, 3], ['h', 4, 3], ['i', 1, 9], ['j', 10, 1],
                ['k', 5, 1], ['l', 1, 4], ['m', 3, 2], ['n', 1, 6], ['o', 1, 7],
                ['p', 4, 2], ['q', 10, 1], ['r', 1, 6], ['s', 1, 5], ['t', 1, 7],
                ['u', 2, 4], ['v', 4, 2], ['w', 4, 2], ['x', 8, 1], ['y', 4, 2],
                ['z', 10, 1], ['*', 0, 2]]

export const letterValues = {'a': 1,
  'b': 4,
  'c': 4,
  'd': 2,
  'e': 1,
  'f': 4,
  'g': 3,
  'h': 4,
  'i': 1,
  'j': 10,
  'k': 5,
  'l': 1,
  'm': 3,
  'n': 1,
  'o': 1,
  'p': 4,
  'q': 10,
  'r': 1,
  's': 1,
  't': 1,
  'u': 2,
  'v': 4,
  'w': 4,
  'x': 8,
  'y': 4,
  'z': 10,
  '*': 0}

// Deprecated
export const tileGraphics = {a: 3, b: 1, c: 2, d: 3, e: 3, f: 2, g: 3, h: 2, i: 3, j: 1, k: 1, l: 3, m: 2, n: 3, o: 3, p: 2, q: 1, r: 3, s: 2, t: 3, u: 3, v: 2, w: 2, x: 1, y: 2, z: 1, '*': 2}

// Events
export const DETACH_FROM_BOARD_EVENT = 'detachfromboardevent'

export const TESTING  = true
