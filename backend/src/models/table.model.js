/* eslint-disable no-undef */
const { Schema, model } = require("mongoose");

const tableSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: new Date,
        required: true
    }
});

const Table = model("table", tableSchema);

module.exports = Table;