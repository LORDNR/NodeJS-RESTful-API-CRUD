
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const animeRouter = require('./routers/anime');

//port
const config = require('config');
const port = process.env.port || config.app.port;
app.listen(port, () => {
    console.log(`listening on port: ${port}...`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


//homepage route
app.get('/' , (req , res)=>{
    return res.send({
        err: false, 
        msg: 'Welcome to RESTful CRUD API with Nodejs, Express, Mysql',
        written_by: 'Ratchanon'
    })
})

//Router
app.use('/anime', animeRouter);




module.exports = app;