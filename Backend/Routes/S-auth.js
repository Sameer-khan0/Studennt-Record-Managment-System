const express=require('express')
const router=express.Router()
const Record=require('../Models/Record')
const jwt=require('jsonwebtoken')
const skey='_010-A-010_'

router.post('/std/record',async (req,res)=>{
    try {
        const {name,id}=req.body
        const finded=await Record.findOne({name:name,sid:id})
        if(!finded){
            return res.status(404).json({status:'error',record:"Record not found"})
        }
        if(finded){
            const stdID=finded.id
            const token=jwt.sign(stdID,skey)
            return res.status(200).json({status:'ok','token':token})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
})

router.get('/get/std/record',async (req,res)=>{
    try {
        const token=req.header('token')
        if(!token){    
            res.status(401).send({ error: "Please authenticate using a valid token" })
        }
        const data=jwt.verify(token,skey)
        const stdDATA=await Record.findById(data)
        res.status(200).json(stdDATA)

    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }

})


module.exports=router