"use strict";

const fs = require ('fs')

const streets_data_url = "docs/streets.json"
const streets_output_dir = "data/streets/"
const volunteer_output_dir = "data/volunteers/"

let streets_data

const loadStreetsJSON = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile (streets_data_url, function (err, data) {
      if (err) {
        reject (err)
      } else {
        streets_data = JSON.parse (parser.toJson (data))
        console.log (streets_data)
        resolve ()
      }
    })
  })
}

loadStreetsJSON ()
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))