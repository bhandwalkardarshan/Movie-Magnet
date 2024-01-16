const express = require('express')
const userRoutes = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const secretKey = process.env.JWT_KEY
// reg
userRoutes.post('/register', async (req,res) => {
    try {
        const {username,avatar,email,password} = req.body
        // console.log("hii")
        const isExisting = await User.findOne({email})

        if(isExisting) 
            return res.status(400).json({message: 'User already exist'})
        
        const hash = await bcrypt.hash(password,10)

        const newUser = new User({username,avatar,email,password:hash})
        await newUser.save()

        res.status(201).json({message: 'User registered'})

    } catch (error) {
        res.status.apply(500).json({message: 'Internal server error'})
    }
})

// login
userRoutes.post('/login', async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user) 
        return res.status(401).json({message: 'Invalid credentials'})

        const passValid = await bcrypt.compare(password, user.password)

        if(!passValid)
        return res.status(401).json({message: 'Invalid credentials'})

        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
            expiresIn: '1h'})
        
        res.status(200).json({message:'Login Successful', token, user})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = userRoutes