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
    let selectedData = req.query["data-selected"]

    // TODO: add actual query
    allNodes.find().lean().exec((err, nodes) => {
        if (err) throw err

        let geojson = {
            type: "FeatureCollection",
            features: []
        }

        for ( let node of nodes ) {
            geojson.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [parseFloat(node.location.lng), parseFloat(node.location.lat)]
                },
                properties: {
                    node_id: node.node_id,
                    reading: getReading(node, selectedData) // eg: "noise", "temperature"
                }
            })
        }
        res.json( JSON.stringify(geojson) )
    })
})

/**
 * Returns value for reading geojson property (avoids reading props of undefined)
 * @param {Node} node node object of current iteration
 * @param {string} selectedData string representation of selected data (from request.body)
 * @returns 
 */
function getReading(node, selectedData) {
    let output;
    try {
        output = getAverageReading( node.readings, selectedData )
        console.log( "selectedData: " + selectedData )
        console.log( "Output: " + output )
    }
    catch( err ) {
        output = null
    }
    finally {
        return output
    }
}

/**
 * Calc and return the MEAN value of given reading in list of readings
 * @param {number[]} readings list of all values for given reading eg: all values for "noise" readings
 * @param {string} selectedData string representation of selected data (from request.body)
 * @returns the mean average of the given list of readings
 */
function getAverageReading( readings, selectedData ) {
    let average = 0
    for ( let entry of readings ) {
        // if null, ignore
        if ( !entry.reading[selectedData] ) { continue } 
        average += entry.reading[selectedData]
    }
    return average / readings.length
}

module.exports = router

