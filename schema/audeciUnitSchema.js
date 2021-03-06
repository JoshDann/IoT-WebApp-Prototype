const mongoose = require("mongoose")

const audeciUnitSchema = new mongoose.Schema({
    node_id: String,
    location: {
        lat: mongoose.Types.Decimal128,
        lng: mongoose.Types.Decimal128
    },
    readings: {
        type: [Object],
        required: false
    }
})

module.exports = mongoose.model("Audeci_Unit", audeciUnitSchema, "nodes")