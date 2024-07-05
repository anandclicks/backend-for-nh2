const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
app.use(express.urlencoded({extended : true}))
app.use(express.json())
const core = require('cors')
app.use(core())

const transporter = nodemailer.createTransport({
  service : 'Gmail',
  auth : {
    user : 'nh2stays@gmail.com',
    pass : 'eyowxwmrmhoisaah'
  }
})

transporter.verify((error,response)=> {
  if(error) {
    console.log(error)
  }
  else {
    console.log("Transporter is ready to send mails")
    app.listen(3001,()=> {
      console.log("server is runnig at 3001")
    })
  }
})


app.post('/',async(req,res)=> {
  const {name,mobileNumber,propertyName,roomSharing} = req.body
  console.log(req.body)
  let mailOption = {
    from : 'nh2stays@gmail.com',
    to : 'info@nh2stays.com',
    subject  : "New query",
    text : `
            Name  : ${name}
            property : ${propertyName}
            number : ${mobileNumber},
            Room Sharing : ${roomSharing}
    `
  }
  try {
    let response = await transporter.sendMail(mailOption)
    res.status(200).send({message : "Email has sended succesfully", info : response})
  } catch (error) {
    res.send({message : "Something went wrong", error : error})
  }
})

