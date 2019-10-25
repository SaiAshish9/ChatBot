const express=require('express')
const app=express()
const bodyParser=require('body-parser')

app.use(bodyParser.json())

const port=process.env.PORT||5000;


require('./routes/routes')(app)



app.listen(port,()=>{
  console.log(`server started on ${port}`);
})
