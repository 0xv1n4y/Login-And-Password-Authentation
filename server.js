const  express = require('express')
const app = express()
const port = 4000
const bcrypt=require("bcrypt")


const users=[]
    

app.use(express.json())

app.get("/",(req,res)=>{
    res.json(users)
})


app.post("/user",async(req,res)=>{

    try{
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        

        const user={name:req.body.name,password:hashedPassword}
        users.push(user)
        res.status(201).send()

    }catch(err){
        res.status(500).json({message:err.message})

    }

   
})


app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))