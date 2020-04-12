"use strict";

const neatCsv = require ('neat-csv')
const fs = require ('fs')

const countycodes_file_path = "data/nn-postcodes.csv"
const volunteers_path = "data/volunteers.json"

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
      return accumulator
    }, {})

    console.log (countycodes_grouped)
    resolve ()
  })
}

loadCountyPostcodes ()
  .then (loadVolunteers)
  .then (groupCountyPostcodes)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))