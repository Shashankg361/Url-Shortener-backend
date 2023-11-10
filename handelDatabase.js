const {MongoClient} = require('mongodb')
const uri = `mongodb+srv://shashankg361:6Z3dWMNtJ5NoDMf8@cluster0.lqkjzg4.mongodb.net/`
const client = new MongoClient(uri ,{ useNewUrlParser: true, useUnifiedTopology: true })
require('dotenv').config();


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