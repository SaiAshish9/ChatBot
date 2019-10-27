const {webhookClient}=require('dialogflow-fulfillment')
const mongoose=require('mongoose')
const Demand=mongoose.model('demand')
const Coupon=mongoose.model('coupon')

module.exports=app=>{
  app.post('/',async (req,res)=>{
    const agent=new webhookClient({request:req,response:res})
function snoopy(agent){
  agent.add('Welcome to my snoopy fulfillment')
}

async function learn(agent){

Demand.findOne({'course':agent.parameters.courses},function(err,course){
  if (course!=null){
    course.counter++;
    course.save()
  }else {
    const demand=new Demand({course:agent.parameters.courses})
  }
})
let responseText=`You want to learn about ${agent.parameters.courses},
Here is a link to all my courses :https://www.udemy.com/`;

let coupon=await Coupon.find({'course':agent.parameters.courses})

if(coupon!==null){
  let responseText=`You want to learn about ${agent.parameters.courses},
  Here is a link to all my courses :${coupon.link}`;
}



agent.add(responseText)
}

    function fallback(agent){
      agent.add(`I didn't understand`)
      agent.add(`I'm sorry,can you try again?`)
    }
    let intentMap=new Map()
    intentMap.set('snoopy',snoopy)
    intentMap.set('learn courses',learn)
    intentMap.set('Default Fallback Intent',fallback)
    agent.handleRequest(intentMap)
  })
}
