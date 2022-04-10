/**
 * dataRouter.js
 * contains all methods and routes relevant to getting data for map view
 */
const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

const mongoose = require("mongoose")
const allNodes = mongoose.model("All_Nodes", new mongoose.Schema({}, {
    strict: false
}), "nodes")

router.use( bodyParser.urlencoded({extended: false}) )


router.get("/", (req, res) => {
    let query = {
        metric: req.query.m,
        datetime: getTimestamp( `${req.query.d}/${req.query.t}` )
    }

    // TODO: add actual query
    allNodes.find().lean().exec( function(err, nodes) {
        if (err) throw err

        let geojson = {
            type: "FeatureCollection",
            features: []
        }
        
        for ( let node of nodes ) {
            let fReadings = getFilteredReadings(node, query)

            geojson.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [parseFloat(node.location.lng), parseFloat(node.location.lat)]
                },
                properties: {
                    node_id: node.node_id,
                    // eg: "noise", "temperature"
                    reading: getReading(fReadings, query.metric) 
                }
            })
        }
        res.json( JSON.stringify(geojson) )
    })
})

/**
 * Returns value for reading geojson property (avoids reading props of undefined)
 * @param {Node} node node object of current iteration
 * @param {string} metric string representation of selected data (from request.body)
 * @returns 
 */
function getReading(readings, metric) {
    let output;
    try {
        output = getAverageReading(readings, metric)
    }
    catch( err ) {
        output = null
    }
    finally {
        return output
    }
}

/**
 * Method for getting timestamp from date string
 * @param {string} timeString String representation of date 
 * @returns Timestamp object of given timeString
 */
function getTimestamp( timeString ) {
    return new Date(timeString).getTime()
}

function getAverageReading(readings, metric) {
    let total = 0;
    for ( let el of readings ) {
        total += el.reading[metric]
    }
    return total/readings.length
}

function queryCheck( reading, query ) {
    console.log( reading.timestamp )
    console.log( query.datetime/1000 )
    console.log( (reading.timestamp) > (query.datetime/1000) )
    console.log()
    return (reading.timestamp) > (query.datetime/1000)
}

function getFilteredReadings( node, query ) {
    let output = []

    for ( let reading of node.readings ) {
        if ( queryCheck( reading, query ) ) {
            output.push( reading )
        }
    }

    return output
}

module.exports = router

