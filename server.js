const express = require('express')
const connectDB = require('./config/db')


const app = express(); 

connectDB(); 

app.get('/', (req, res) => res.json({msg:"Welcome to Bug Tracker API"}));



const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/issues', require('./routes/issues'));




app.listen(PORT, () => console.log(`server started on port ${PORT}`));