const mongo = require('mongodb')
const express = require('express');
const {connectToDB , client} = require('./handelDatabase');
const cors = require('cors')
const shortid = require('shortid')
const app = express();
const port = 8000;
const db = client.db('UrlShortener');
const collection = db.collection('URL')
var count = 0;
app.use(cors());

connectToDB();

app.get('/api/home',async (req,res)=>{
    const query = req.query.q ;
    const id = shortid.generate();
    console.log('calling')

    const data = {Id:id , Url : query};
    try
    {const result = await collection.insertOne(data);
        console.log(result.insertedId);
        res.status(200).json({Message : `https://url-shortener-backend-production-35fd.up.railway.app/${id}`});
    }catch(error){
        console.log('error occured while storing the data ' ,error)
        res.json({Message:`error occured while storing the data ${error}`})
    }
})

app.get('/favicon.ico', (req, res) => {
    res.status(204);  // No content for favicon request
});

app.get('/api/:id',async (req,res)=>{
    console.log('called once - ', count++);
    const id = req.params.id;
    
    console.log('Id -',id);
    try{
        const result = await collection.findOne({Id:id});
        if(result){
            console.log('datatbseLink - ',result.Url)
            const url = result.Url;
            res.redirect(url);
        }else{
            console.log('Document not found')
        }
    }catch(error){
        res.json({Message:`Error occured ${error}`})
    }
    
})

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})
