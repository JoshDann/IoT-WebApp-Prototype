const express = require("express")
const bodyParser = require("body-parser")
const app = express()

const port = 8080
var db_uri = "mongodb://localhost:27017"

const mongoose = require("mongoose")

app.set( "view engine", "ejs" )
app.use( express.static("./public/") )
app.use( bodyParser.json() )

// mongoose.connect( db_uri, (err) => {
//     if (err) throw err
//     app.listen( port, () => {
//         console.log( `Connected to DB and listening on port: ${port}` )
//     } )
    
// })

app.listen( port, () => {
    console.log( `Connected to DB and listening on port: ${port}` )
} )

/**
 * Default route
 */
app.get("/", (req, res) => {
    res.render( "index", {
        pageTitle: "Audeci Map"
    } )
})

app.get( "/register", (req, res) => {
    res.render( "register", {
        pageTitle: "Audeci Register"
    } )
} )