const express = require("express")
const bodyParser = require("body-parser")
const app = express()

const port = 8080
var db_uri = "mongodb+srv://adsu:adsu@rgu-adsu.y36bi.mongodb.net/audeci"

const registerRouter = require("./routers/registerRouter")
const dataRouter = require("./routers/dataRouter")

const mongoose = require("mongoose")

// used to return jsonfile as placeholder until we hook up db
// const jsonData = require('./test-source.json');

app.set( "view engine", "ejs" )
app.use( express.static("./public/") )
app.use( bodyParser.urlencoded({extended: true}) )

// routers
app.use( "/register", registerRouter )
app.use( "/data", dataRouter )

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
    res.render( "index" )
})