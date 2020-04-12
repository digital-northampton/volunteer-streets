"use strict";

const fs = require ('fs')
const parser = require('xml2json');

const streets_data_path = "data/streets.xml"

let streets_data
let streets = []

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

const filterStreetData = () => {
  return new Promise ((resolve, reject) => {

    streets = streets_data.map (way => {

      const highway = way.tag.find (t => t.k == "highway")
      const name = way.tag.find (t => t.k == "name")
      const ref = way.tag.find (t => t.k == "ref")

      return {
        id: way.id,
        highway:highway == undefined ? "": highway.v,
        name:name == undefined ? "": name.v,
        ref:ref == undefined ? "": ref.v,
      }
    }, [])

    // const streets = streets_data.map (s => s)
    
    console.log (streets)

    resolve ()
  })
}

loadStreetsXML ()
  .then (filterStreetData)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))

