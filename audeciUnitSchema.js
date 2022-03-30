
const mongoose = require("mongoose")

const audeciUnitSchema = new mongoose.Schema({
    node_id: String
    // Location: {
    //     lat: Number,
    //     lng: Numbera
    // }
})

module.exports = mongoose.model( "Audeci_Unit", audeciUnitSchema, "nodes" )