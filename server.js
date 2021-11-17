const express = require('express')
const connectDB = require('./config/db')


const app = express(); 

//Connecting to the database

connectDB(); 

// init middleware
app.use(express.json({extended: false}));


app.get('/', (req, res) => res.json({msg:"Welcome to Issue Tracker API"}));



const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/issues', require('./routes/issues'));
app.use('/api/fixes', require('./routes/fixes'));




app.listen(PORT, () => console.log(`server started on port ${PORT}`));