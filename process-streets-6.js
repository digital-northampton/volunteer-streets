"use strict";

const fs = require ('fs')
const path = require ('path')

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

const setVolunteerStreets = () => {
  return new Promise ((resolve, reject) => {
    volunteers.forEach ((volunter, index) => {
      const filename = volunteers_data_dir + volunter.postcode.toUpperCase ().replace (" ", "-") + ".json"
      const rawdata = fs.readFileSync (filename)
      const volunterData = JSON.parse (rawdata)

      volunteers[index].streets = volunterData.streets.reduce ((acc, street) => {
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
  .then (setVolunteerStreets)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))
