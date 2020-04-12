"use strict";

const fs = require ('fs')
const path = require ('path')

const volunteers_data_dir = "docs/volunteers/"
const volunteer_data_path = "docs/volunteers.json"

let ids
let volunteers

const loadVolunteers = () => {
  return new Promise ((resolve, reject) => {
    const rawdata = fs.readFileSync (volunteer_data_path)
    volunteers = JSON.parse (rawdata)
    resolve ()
  })
}

const setVolunteerStreets = () => {
  return new Promise ((resolve, reject) => {
    volunteers.forEach ((volunter, index) => {
      const filename = volunteers_data_dir + volunter.postcode.toUpperCase ().replace (" ", "-") + ".json"
      const rawdata = fs.readFileSync (filename)
      const volunterData = JSON.parse (rawdata)
      volunteers[index].streets = volunterData.streets
    })

    
    const data = JSON.stringify (volunteers)
    fs.writeFileSync (volunteer_data_path, data);
    
    resolve ()
  })
}

loadVolunteers ()
  .then (setVolunteerStreets)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))
