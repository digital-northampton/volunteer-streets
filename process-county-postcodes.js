"use strict";

const neatCsv = require ('neat-csv')
const fs = require ('fs')

const countycodes_file_path = "data/nn-postcodes.csv"

let countycodes

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

loadCountyPostcodes ()
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))