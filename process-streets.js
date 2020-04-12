"use strict";

const fs = require ('fs')
const parser = require('xml2json');

const streets_data_path = "data/streets.xml"
const output_path = "docs/streets.json"

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

const formatStreetData = () => {
  return new Promise ((resolve, reject) => {

    streets = streets_data.map (way => {

      const highway = way.tag.find (t => t.k == "highway")
      const name = way.tag.find (t => t.k == "name")
      const ref = way.tag.find (t => t.k == "ref")
      const abutters = way.tag.find (t => t.k == "abutters")
      const street = {id: way.id}

      if (highway != undefined) {
        street.highway = highway.v
      }
      if (name != undefined) {
        street.name = name.v
      }
      if (ref != undefined) {
        street.ref = ref.v
      }
      if (abutters != undefined) {
        street.abutters = abutters.v
      }

      return street
    }, [])

    resolve ()
  })
}

const filterStreetData = () => {
  return new Promise ((resolve, reject) => {
    streets = streets
                .filter (s => s.highway == "residential" || s.abutters == "residential")
                .map (s => {
                  delete s.highway;
                  delete s.abutters;
                  return s
                })
    
    resolve ()
  })
}

const outputStreetData = () => {
  return new Promise ((resolve, reject) => {
    const output_file = fs.openSync (output_path, 'w');
    const data = JSON.stringify (streets)
    fs.writeFileSync (output_file, data);
    resolve ()
  })
}

loadStreetsXML ()
  .then (formatStreetData)
  .then (filterStreetData)
  .then (outputStreetData)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))

