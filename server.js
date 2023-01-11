import express, { json } from 'express';
import connectDB from './config/db.js';
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import issuesRoute from './routes/issues.js'
import fixesRoute from './routes/fixes.js'


import { resolve } from 'path';
const app = express();



connectDB();
app.use(json({extended: false}));


const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/issues', issuesRoute);
app.use('/api/fixes', fixesRoute);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(resolve(__dirname, 'client', 'build', 'index.html')))
}


app.listen(PORT, () => console.log(`server started on port ${PORT}`));