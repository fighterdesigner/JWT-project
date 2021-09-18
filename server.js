require("dotenv").config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.json())


app.get("/posts",athenticateToken, (req, res) => {
    res.send(`Welcome ${req.user.name}`)
})

app.post("/login", (req,res) => {

    const username = req.body.user

    const user = { name: username }

    const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({accesstoken: accesstoken})

})

function athenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(process.env.PORT, () => console.log("the server is runing"))
