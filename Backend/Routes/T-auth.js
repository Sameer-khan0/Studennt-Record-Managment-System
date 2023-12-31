const express=require('express')
const router=express.Router()
const auth=require('../Models/auth')
const jwt=require('jsonwebtoken')
const skey='_010-A-010_'

router.post('/register/teacher',async (req,res)=>{
    try {
        const {name,email,tid}=req.body
        if(!name || !email || !tid){
            return res.status(400).json({ errors: "Data not found"});
        }
        const isitnew=await auth.findOne({name:name,email:email,tid:tid})
        if(isitnew){
            return res.status(400).json({ error: "Sorry a user with this data is already exists" })
        }
        const cteacher=await auth.create({name:name,email:email,tid:tid})
        if(cteacher){
            const token = jwt.sign({ id: cteacher.id }, skey);
            res.status(200).json({status:"ok",token:token})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error");
    }
})


router.post('/login/teacher',async (req,res)=>{
    try {
        const {email,tid}=req.body
        if(!email || !tid){
            return res.status(400).json({error:"Data not found"})
        }
        const findteach=await auth.findOne({email:email,tid:tid})
        if(findteach){
            const token=jwt.sign({id:findteach.id},skey)
            return res.status(200).json({status:"ok",token:token})
        }
        if(!findteach){
            return res.status(400).json({status:"error",result:"User not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error");
    }
})

router.get('/get/teacher',async (req,res)=>{
    try {
        const token=req.header('token')
        if(!token){    
            res.status(401).send({ error: "Please authenticate using a valid token" })
        }
        const data=jwt.verify(token,skey)
        const stdDATA=await auth.findById(data.id)
        res.status(200).json(stdDATA)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router



// router.get('/test', async (req, res) => {
//     const { name } = req.query;

//     const data = name;
//     try {
//         const test1 = await auth.find({ name: { $eq: data } });

//         if (test1.length > 0) {
//             res.json(test1);
//         } else {
//             res.json({ message: 'No matching documents found.' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// router.get('/test1', async (req, res) => {
//     const { userId } = req.query; 

//     try {
//         const allUsersExceptCurrent = await auth.find({ _id: { $ne: userId } });

//         if (allUsersExceptCurrent.length > 0) {
//             res.json(allUsersExceptCurrent);
//         } else {
//             res.json({ message: 'No other users found.' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
