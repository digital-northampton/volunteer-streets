"use strict";

const fs = require ('fs')
const path = require ('path')

const street_data_dir = "docs/streets/"
const volunteers_data_dir = "docs/volunteers/"
const volunteer_data_path = "docs/volunteers.json"

let ids
let volunteers

const getIDs = () => {
  return new Promise ((resolve, reject) => {
    const files = fs.readdirSync (street_data_dir)

    ids = files
            .filter (f => f.indexOf (".json") > -1)
            .map (f => f.replace (".json", ""))
            .map (f => parseInt (f))
    
    resolve ()
  })
}

const loadVolunteers = () => {
  return new Promise ((resolve, reject) => {
    const rawdata = fs.readFileSync (volunteer_data_path)
    volunteers = JSON.parse (rawdata)
    resolve ()
  })
}

const setVolunteerPostcodes = () => {
  return new Promise ((resolve, reject) => {
    volunteers.forEach ((v,index) => {
      const streets = [];
      ids.forEach (id => {
        const filename = street_data_dir + id + ".json"
        const rawdata = fs.readFileSync (filename)
        const street = JSON.parse (rawdata)
        if (street.volunteer_postcode == v.postcode) {
          streets.push ({
            id:street.id,
            name:street.name,
            distance: street.closest_distance
          })
        }
      })

      volunteers[index].streets = streets
      const filenamne = volunteers_data_dir + v.postcode.toUpperCase ().replace (" ", "-") + ".json"

      const data = JSON.stringify (volunteers [index])
      fs.writeFileSync (filenamne, data);

      console.log (index, volunteers.length)
    })
    
    resolve ()
  })
}

getIDs ()
  .then (loadVolunteers)
  .then (setVolunteerPostcodes)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))
