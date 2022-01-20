const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express(); 

//Connecting to the database

connectDB(); 

// init middleware
app.use(express.json({extended: false}));


const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/issues', require('./routes/issues'));
app.use('/api/fixes', require('./routes/fixes'));


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}


app.listen(PORT, () => console.log(`server started on port ${PORT}`));