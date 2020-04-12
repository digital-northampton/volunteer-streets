"use strict";

const neatCsv = require ('neat-csv')
const fs = require ('fs')

const countycodes_file_path = "data/nn-postcodes.csv"
const volunteers_path = "data/volunteers.json"
const output_path = "docs/codes.json"

let volunteers
let countycodes
let countycodes_grouped

const loadCountyPostcodes = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile (countycodes_file_path, (error, data) => {
        if (error) {
          reject (error);
        } else {
          (async () => {
            countycodes = await neatCsv (data);
            resolve ();
          })();
        }
    });
  })
}

const loadVolunteers = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile (volunteers_path, (error, data) => {
        if (error) {
          reject (error);
        } else {
          volunteers = JSON.parse (data)
          resolve ()
        }
    });
  })
}

const groupCountyPostcodes = () => {
  return new Promise ((resolve, reject) => {
    countycodes_grouped = countycodes.reduce ((accumulator, currentValue) => {
      const key = currentValue.Postcode.split (" ")[0]

      if (accumulator[key] == undefined) {
        accumulator[key] = {
          "population" : 0,
          "households" : 0,
          "volunteers" : 0,
          "areas" : [],
        }
      }

      accumulator[key].population += parseInt (currentValue.Population)
      accumulator[key].households += parseInt (currentValue.Households)

      const area = currentValue["Built Up Area"].trim ()
      if (! accumulator[key].areas.includes (area) && area != "") {
        accumulator[key].areas.push (area)
      }

      return accumulator
    }, {})

    resolve ()
  })
}

const assignVolunteerCounts = () => {
  return new Promise ((resolve, reject) => {
    for (const key in countycodes_grouped) {
      const count = volunteers
                      .map (v => v.postcode)
                      .map (v => v.split (" ")[0])
                      .filter (v => v.toUpperCase () == key.toUpperCase ())
                      .length

      countycodes_grouped [key].volunteers = count
    }
    resolve ()
  })
}

const outputData = () => {
  return new Promise ((resolve, reject) => {
    const output_file = fs.openSync (output_path, 'w');
    const data = JSON.stringify (countycodes_grouped)
    fs.writeFileSync (output_file, data);
    resolve ()
  })
}

loadCountyPostcodes ()
  .then (loadVolunteers)
  .then (groupCountyPostcodes)
  .then (assignVolunteerCounts)
  .then (outputData)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))


