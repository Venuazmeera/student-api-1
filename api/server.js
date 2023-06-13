//This comment here for localhost server
const http = require ('http');
const app = require('.');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log('Listening to port 3000'));

/*require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

//for unwanted errors
mongoose.set('strictQuery', true);
const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URI);
        //const conn = await mongoose.createConnection(process.env.MONGO_URI);
        //console.log(`MongoDB Connected: ${conn.connection.host}`);
        const conn = await mongoose.mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        }catch(error){
        console.log(error);
        process.exit(1);
    }
}

//connection to DB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
});*/