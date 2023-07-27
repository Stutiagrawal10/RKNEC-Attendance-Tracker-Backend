const express = require('express')
const router = express.Router() 
const Credential = require('../models/credential');

router.get('/',async(req,res)=>{
    try{
        const credentials = await Credential.find()
        return res.status(200).json(credentials)
    }catch(error){
        return res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.post('/', async(req, res)=>{
    if(!req.body.RKNEC_email || !req.body.password){
        return res.status(400).send({
            "message" : "Mention the required field: RKNEC_email and password"
        })
    }
    try {
        const credential = new Credential({
            RKNEC_email: req.body.RKNEC_email,
            password: req.body.password
        })
        await credential.save()
        return res.status(200).send({
            "message": "User credentials saved successfully"
        })
    } catch (error) {
        return res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.delete('/', async(req, res)=>{
    if(!req.body.RKNEC_email){
        return res.status(400).send({
            "message" : "Mention the required field: RKNEC_email"
        })
    }
    try {
        const credential = await Credential.findOne({
            RKNEC_email: req.body.RKNEC_email
        })
        
        if(!credential){
            return res.status(400).send({
                "message": "User credential not found"
            })
        }

        await Credential.findByIdAndDelete(credential._id)
        
        return res.status(200).send({
            "message": "User credentials deleted successfully"
        })
    } catch (error) {
        return res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

module.exports = router 
