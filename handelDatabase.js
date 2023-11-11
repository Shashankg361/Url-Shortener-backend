require('dotenv').config();
const {MongoClient} = require('mongodb')
const uri = `mongodb+srv://shashankg361:${process.env.PASSWORD}@cluster0.lqkjzg4.mongodb.net/`
const client = new MongoClient(uri ,{ useNewUrlParser: true, useUnifiedTopology: true })



const  connectToDB = async()=>{
    try{
        await client.connect();
        console.log('Successfully coneected');
    }catch(error){
        console.log('Not connected ' , error)
    }
}

module.exports ={
    connectToDB,
    client
};