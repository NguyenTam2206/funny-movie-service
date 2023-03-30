const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, {
            // useUrlParser: true
        })

        console.log('Connected to mongo db');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;