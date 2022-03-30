const express = require("express")
const bodyParser = require("body-parser")
const app = express()

const port = 8080
var db_uri = "mongodb+srv://adsu:adsu@rgu-adsu.y36bi.mongodb.net/audeci"

const mongoose = require("mongoose")
const AudeciUnit = require("./audeciUnitSchema")

//used to return jsonfile as placeholder until we hook up db
const jsonData = require('./test-source.json');

app.set( "view engine", "ejs" )
app.use( express.static("./public/") )
app.use( bodyParser.urlencoded({extended: true}) )

mongoose.connect( db_uri, (err) => {
    if (err) throw err
    app.listen( port, () => {
        console.log( `Connected to DB and listening on port: ${port}` )
    } )
})

// app.listen( port, () => {
//     console.log( `Connected to DB and listening on port: ${port}` )
// } )

/**
 * Default route
 */
app.get("/", (req, res) => {
    res.render( "index" )
})

//route returns data to map page for visualisation
app.get("/data", (req, res) =>{

    return res.json(jsonData);
})

app.get( "/register", (req, res) => {
    res.render( "register" )
} )

/**
 * Route to add new node to the audeci db
 */
app.post( "/register/new", (req, res) => {
    // code to add unit to server
    console.log( req.body.node_id )
    let newUnit = new AudeciUnit({
        node_id: req.body.node_id
        // TODO: add location data
    })
    newUnit.save()
    res.redirect("/")
} )