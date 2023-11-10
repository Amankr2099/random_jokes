const express = require('express')
const https = require('https')
const { Script } = require('vm')

app = express()
app.use(express.json())
app.use(express.static("stylings"))
app.set('view engine', 'ejs')


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/home.html")
})

app.post("/", function (req, res) {
    const url = "https://v2.jokeapi.dev/joke/Any?type=twopart"
    https.get(url, function (response) {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
            response.on("data", function (data) {
                const obj = JSON.parse(data)
                var statement1 = obj.setup
                var statement2 = obj.delivery
                res.render("update-home",{
                    state1 : statement1,
                    state2 : statement2
                })
            })
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
    })
})

app.post("/failure", function (req, res) {
    res.redirect("/")
})

app.listen(3000, function (req, res) {
    console.log("Server Initiated");
})
