const express = require('express')
const app = express()
const cors = require('cors')
const axdata = require('./axdata.js')



app.get('/food', async (req, res) => {
    await axdata('바나나칩', (error, {apiReq}={})=>{
        if (error){
            res.send(error)
        }
        res.send(apiReq)
    })
})

app.get('/backend', async (req, res) => {
    await axdata('바나나칩', (error, {apiReq}={})=>{
        if (error){
            res.send(error)
        }
        res.send(apiReq)
    })
})


    
app.listen(8080, ()=> {
    console.log("The server is running at port 8080")
})

app.use(cors());