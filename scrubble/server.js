const KoaStatic = require('koa-static');
const Server = require('boardgame.io/server');
const TicTacToe = require('./app');

const app = Server({ game: TicTacToe });
app.use(KoaStatic('./'));
app.listen(8000);