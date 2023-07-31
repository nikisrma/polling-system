const express = require('express');
const app = express();
const port = 8000;

require('dotenv').config();
require('./config/db.config');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({extended:true}));


// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
