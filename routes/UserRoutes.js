const express = require("express");
const { UserModel } = require("../Model/UserModel");
const jwt = require("jsonwebtoken")
const bcypt = require("bcrypt")

const UserRouter = express.Router()

UserRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city } = req.body
    try {
        bcypt.hash(password, 5, async function (err, hash) {
            if (err)
                res.send({ "msg": "something Wrong", "err": err.message })
            else {
                const newUser = new UserModel({ name, email, gender, password: hash, age, city })
                await newUser.save()
                res.send({ "msg": "Register Successfully" })
            }
        })
    }
    catch (err) {
        res.send({ "msg": "something Wrong", "err": err.message });
    }
})

UserRouter.post("/login", async (req, res) => {
    const { email, password} = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {

            bcypt.compare(password, user[0].password, async function (err, result) {
                if (err)
                    res.send({ "msg": " Wrong Credential", "err": err.message })
                else {
                    const token = jwt.sign({ userID: user[0]._id }, "surya")

                    res.send({ "msg": "Login Successfully", "token": token })
                }
            })
        }
    } catch (err) {
        res.send({ "msg": "something Wrong", "err": err.message });
    }
})

module.exports = { UserRouter }