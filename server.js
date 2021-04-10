const express = require('express')
const expressLayouts = require('express-ejs-layouts')
//const faker = require('faker')

const app = express()
const port = 8080

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static('public'))

app.get("/", function(req,res){
    res.render('home')
})

app.get("/new", function(req,res){
    res.render('new')
})

app.listen(port, function(){
    console.log(`Server is running at localhost:${port}`)
})
