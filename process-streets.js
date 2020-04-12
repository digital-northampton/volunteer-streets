"use strict";

const fs = require ('fs')
const parser = require('xml2json');

const streets_data_path = "data/streets.xml"

let streets_data

const loadStreetsXML = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile (streets_data_path, function (err, data) {
      if (err) {
        reject (err)
      } else {
        streets_data = JSON.parse (parser.toJson (data)).osm.way
        resolve ()
      }
    })
  })
}

const outputStreetJson = () => {
  return new Promise ((resolve, reject) => {

    const streets = streets_data.map (s => s)
    
    console.log (streets)

    resolve ()
  })
}

loadStreetsXML ()
  .then (outputStreetJson)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))

