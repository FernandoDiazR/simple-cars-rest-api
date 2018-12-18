const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const db = require('./dbconf');

const app = express();

const usersRoutes = require('./routes/users');

//------------CONNECTION DATABASE--------------------
mongoose.connect(db.conString, { 
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
}).then(con => console.log('Database connected.'))
.catch(err => console.log(err));

//----------CONF PORT--------------------------------
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());

//--------------------ROUTERS-----------------------
app.use('/users', usersRoutes);



app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});