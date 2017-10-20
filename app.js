let express = require('express');
let TDController = require('./controller/cntr');
let app = express();

// setup template engine
app.set('view engine', 'ejs');

// initialize controller
TDController(app);

// static files
app.use(express.static('./public'));

// listen to a port
app.listen(8888);
console.log('Listening to port 8888');
