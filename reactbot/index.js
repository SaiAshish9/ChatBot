const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
app.use(bodyParser.json())
const config=require('./config/keys')
const path=require('path')

mongoose.connect(config.mongoURI,{useNewUrlParser:true})

const port=process.env.PORT||5000;


require('./routes/routes')(app)

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(port,()=>{
  console.log(`server started on ${port}`);
})
