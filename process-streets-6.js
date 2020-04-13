"use strict";

const fs = require ('fs')
const path = require ('path')
const deepmerge = require ('deepmerge');

const volunteers_data_dir = "docs/volunteers/"
const volunteer_data_path = "docs/volunteers.json"

let ids
let volunteers
let new_volunteers = []

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

const loadVolunteers = () => {
  return new Promise ((resolve, reject) => {
    const rawdata = fs.readFileSync (volunteer_data_path)
    volunteers = JSON.parse (rawdata)
    resolve ()
  })
}

const removeDuplicates = () => {
  return new Promise ((resolve, reject) => {
    const idPairs = []

    volunteers.forEach ((volunteer, index) => {
      const i = volunteers.findIndex (v => v.postcode.toLowerCase ().trim() == volunteer.postcode.toLowerCase ().trim())
      if (i !== index && i !== -1) {
        idPairs.push ([index, i])
      }
    })

    console.log (volunteers.length + " volunteers")
    console.log (idPairs.length + " duplicates")

    idPairs.forEach (pair => {
      volunteers[pair[0]] = deepmerge(volunteers[pair[0]], volunteers[pair[1]]);
      volunteers[pair[1]] = false
    })

    volunteers = volunteers.filter (v => v !== false)

    console.log (volunteers.length + " volunteers")

    resolve ();
  })
}

const setVolunteerStreets = () => {
  return new Promise ((resolve, reject) => {
    volunteers.forEach ((volunteer, index) => {
      const filename = volunteers_data_dir + volunteer.postcode.toUpperCase ().replace (" ", "-") + ".json"
      const rawdata = fs.readFileSync (filename)
      const volunteerData = JSON.parse (rawdata)

      volunteers[index].streets = volunteerData.streets.reduce ((acc, street) => {
        const index = acc.findIndex (s => s.name.toLowerCase ().trim() == street.name.toLowerCase ().trim())
        if (index == -1) {
          acc.push ({
            ids: [street.id],
            name: street.name
          })
        } else {
          acc[index].ids.push (street.id)
        }

        return acc
      }, [])
    })

    const data = JSON.stringify (volunteers)
    fs.writeFileSync (volunteer_data_path, data);
    
    resolve ()
  })
}

loadVolunteers ()
  .then (removeDuplicates)
  .then (setVolunteerStreets)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))
