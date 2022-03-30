const express = require("express")
const bodyParser = require("body-parser")
const app = express()

const port = 8080
var db_uri = "mongodb+srv://adsu:adsu@rgu-adsu.y36bi.mongodb.net/audeci"

const mongoose = require("mongoose")
const AudeciUnit = require("./audeciUnitSchema")

const allReadings = mongoose.model( "All_Readings", new mongoose.Schema({}, {strict: false}), "readings" )

// used to return jsonfile as placeholder until we hook up db
// const jsonData = require('./test-source.json');

app.set( "view engine", "ejs" )
app.use( express.static("./public/") )
app.use( bodyParser.urlencoded({extended: true}) )

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

// route returns data to map page for visualisation
app.get("/data", (req, res) =>{
    // jsonData is placeholder test file for getting the map working
    // need to replace with call to db to grab relevant info 
    // return res.json(jsonData);
    allReadings.find().lean().exec( function( err, data ) {
        console.log( data )
        if ( err ) throw err
        res.json(data)
    } )
})

app.get( "/register", (req, res) => {
    res.render( "register" )
} )

/**
 * Route to add new node to the audeci db
 */
app.post( "/register/new", (req, res) => {
    let newUnit = new AudeciUnit({
        node_id: req.body.node_id,
        location: {
            lat: parseFloat(req.body.node_lat),
            lng: parseFloat(req.body.node_lng)
        }
    })
    newUnit.save()
    res.redirect("/")
} )