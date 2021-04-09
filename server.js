const express = require('express')
const expressLayouts = require('express-ejs-layouts')
//const faker = require('faker')

const app = express()
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))

app.use('static', express.static('/public'))

app.get("/", function(req,res){
    res.render('index')
})

app.get(`/${id}`, function(req,res){
    res.render('new')
})

app.listen(8080, function(){
    console.log("Server is running at localhost:8080")
})
