/**
 * registerRouter.js
 * contains all methods and routes relevant to registering an Audeci node
 */

const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

const mongoose = require("mongoose")
// const allNodes =    mongoose.model( "All_Nodes", new mongoose.Schema({}, {strict: false}), "nodes" )
 
const AudeciUnit = require("../schema/audeciUnitSchema")

router.get( "/", (req, res) => {
    res.render( "register" )
} )

/**
 * Route to add new node to the audeci db
 */
router.post( "/new", (req, res) => {
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

module.exports = router