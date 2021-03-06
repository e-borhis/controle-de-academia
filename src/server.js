// Criando um servidor
// npm init -y 
// npm install express
// npm install -D nodemon
// npm install nunjucks - template engine


const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express()

// Configrando arquivos estáticos (css e etc)
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

// Configuração Template Engine
server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.listen(5000, function() {
    console.log("server is running")
})