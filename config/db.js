import mongoose  from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {});

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


export default connectDB;

