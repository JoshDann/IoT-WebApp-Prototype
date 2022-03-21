const express = require("express")
const bodyParser = require("body-parser")
const app = express()

const port = 8080

const mongoose = require("mongoose")

app.set( "view engine", "ejs" )
app.use( express.static("./public/") )
app.use( bodyParser.json() )

let db_uri = "mongodb://localhost:27017"
mongoose.connect( db_uri, (err) => {
    if (err) throw err
    app.listen( port, () => {
        console.log( `Connected to DB and listening on port: ${port}` )
    } )
})

/**
 * Default route
 */
app.get("/", (req, res) => {
    res.render( "index", {
        pageTitle: "Audeci Map"
    } )
})